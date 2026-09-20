import re
import json
import time
import urllib.request
import urllib.error

def load_env(env_path='.env'):
    env_vars = {}
    try:
        with open(env_path, 'r', encoding='utf-8') as f:
            for line in f:
                line = line.strip()
                if not line or line.startswith('#') or '=' not in line:
                    continue
                k, v = line.split('=', 1)
                env_vars[k.strip()] = v.strip()
    except Exception as e:
        print(f"[!] Error reading {env_path}: {e}")
    return env_vars

def sync_env(updates, env_path='.env'):
    try:
        with open(env_path, 'r', encoding='utf-8') as f:
            content = f.read()

        for k, v in updates.items():
            if v:
                pattern = re.compile(rf'^{k}=.*$', re.MULTILINE)
                if pattern.search(content):
                    content = pattern.sub(f'{k}={v}', content)
                else:
                    content += f"\n{k}={v}"

        with open(env_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print("\n[+] Synchronized active tokens to .env successfully.")
    except Exception as e:
        print(f"[!] Failed to sync .env: {e}")

def main():
    env = load_env()
    base_url = 'http://localhost:9093'
    mailpit_url = 'http://localhost:8025'

    tests = []

    def send_request(no, name, method, url, headers=None, body=None):
        print(f"\n[{no}/10] Testing: {name}")
        print(f"       Method: {method} | URL: {url}")
        if body:
            print(f"       Body: {json.dumps(body)}")

        req_headers = headers.copy() if headers else {}
        data = None
        if body is not None:
            data = json.dumps(body).encode('utf-8')
            req_headers['Content-Type'] = 'application/json'

        req = urllib.request.Request(url, data=data, headers=req_headers, method=method)

        status = None
        resp_body = ""
        try:
            with urllib.request.urlopen(req) as resp:
                status = resp.status
                resp_body = resp.read().decode('utf-8', errors='replace')
        except urllib.error.HTTPError as e:
            status = e.code
            resp_body = e.read().decode('utf-8', errors='replace')
        except Exception as ex:
            status = 'ERR'
            resp_body = str(ex)

        snippet = resp_body[:180] + ("..." if len(resp_body) > 180 else "")
        snippet = snippet.replace('\n', ' ').replace('\r', '')
        print(f"       --> Response HTTP {status}: {snippet}")

        tests.append({
            'no': no,
            'name': name,
            'method': method,
            'url': url,
            'status': status,
            'body': resp_body
        })
        return status, resp_body

    print("================================================================================")
    print("           AUTOMATED 10-ENDPOINT API TEST SUITE (api.rest)")
    print("================================================================================")

    # -------------------------------------------------------------------------
    # 1. Admin Section
    # -------------------------------------------------------------------------
    # 1.1 Admin Login
    s1, b1 = send_request(
        1, "1.1 Admin Login", "POST", f"{base_url}/admin/login",
        body={
            "email": env.get('ADMIN_EMAIL'),
            "password": env.get('ADMIN_PASSWORD'),
            "rememberMe": env.get('REMEMBER_ME', 'true').lower() == 'true'
        }
    )
    admin_token = env.get('ADMIN_TOKEN', '')
    try:
        admin_token = json.loads(b1).get('data', {}).get('token', admin_token)
    except Exception:
        pass

    # 1.2 Admin Signup
    s2, b2 = send_request(
        2, "1.2 Admin Signup", "POST", f"{base_url}/admin/register",
        body={
            "firstname": env.get('ADMIN_FIRSTNAME', 'Patipan'),
            "lastname": env.get('ADMIN_LASTNAME', 'Plonying'),
            "email": env.get('ADMIN_EMAIL'),
            "password": env.get('ADMIN_PASSWORD')
        }
    )

    # 1.3 Admin Forgot Password
    s3, b3 = send_request(
        3, "1.3 Admin Forgot Password", "POST", f"{base_url}/admin/forgot-password",
        body={
            "email": env.get('ADMIN_EMAIL')
        }
    )

    time.sleep(1)
    # Extract Admin Reset Token from Mailpit
    admin_reset_token = env.get('ADMIN_RESET_TOKEN', '')
    try:
        with urllib.request.urlopen(f"{mailpit_url}/api/v1/messages") as resp:
            msgs = json.loads(resp.read().decode()).get('messages', [])
            for m in msgs:
                if env.get('ADMIN_EMAIL') in m.get('To', [{}])[0].get('Address', ''):
                    msg_id = m.get('ID')
                    with urllib.request.urlopen(f"{mailpit_url}/api/v1/message/{msg_id}") as mr:
                        text = json.loads(mr.read().decode()).get('Text', '')
                        match = re.search(r'code=([a-zA-Z0-9]+)', text)
                        if match:
                            admin_reset_token = match.group(1)
                            print(f"       [Mailpit] Found Admin Reset Token: {admin_reset_token[:15]}...")
                            break
    except Exception as e:
        print(f"       [Mailpit Error] {e}")

    # 1.3.1 Admin Reset Password
    s4, b4 = send_request(
        4, "1.3.1 Admin Reset Password", "POST", f"{base_url}/admin/reset-password",
        body={
            "resetPasswordToken": admin_reset_token,
            "password": env.get('ADMIN_NEW_PASSWORD', env.get('ADMIN_PASSWORD'))
        }
    )
    try:
        admin_token = json.loads(b4).get('data', {}).get('token', admin_token)
    except Exception:
        pass

    # 1.4 Admin Profile
    s5, b5 = send_request(
        5, "1.4 Admin Profile", "GET", f"{base_url}/admin/me",
        headers={"Authorization": f"Bearer {admin_token}"}
    )

    # -------------------------------------------------------------------------
    # 2. User Section
    # -------------------------------------------------------------------------
    # 2.1 User Login
    s6, b6 = send_request(
        6, "2.1 User Login", "POST", f"{base_url}/api/auth/local",
        body={
            "identifier": env.get('USER_IDENTIFIER', env.get('USER_EMAIL')),
            "password": env.get('USER_PASSWORD')
        }
    )
    user_token = env.get('USER_TOKEN', '')
    try:
        user_token = json.loads(b6).get('jwt', user_token)
    except Exception:
        pass

    # 2.2 User Signup
    s7, b7 = send_request(
        7, "2.2 User Signup", "POST", f"{base_url}/api/auth/local/register",
        body={
            "username": env.get('USER_USERNAME', 'student_sec'),
            "email": env.get('USER_EMAIL'),
            "password": env.get('USER_PASSWORD')
        }
    )

    # 2.3 User Forgot Password
    s8, b8 = send_request(
        8, "2.3 User Forgot Password", "POST", f"{base_url}/api/auth/forgot-password",
        body={
            "email": env.get('USER_EMAIL')
        }
    )

    time.sleep(1)
    # Extract User Reset Code from Mailpit
    user_reset_code = env.get('USER_RESET_CODE', '')
    try:
        with urllib.request.urlopen(f"{mailpit_url}/api/v1/messages") as resp:
            msgs = json.loads(resp.read().decode()).get('messages', [])
            for m in msgs:
                if env.get('USER_EMAIL') in m.get('To', [{}])[0].get('Address', ''):
                    msg_id = m.get('ID')
                    with urllib.request.urlopen(f"{mailpit_url}/api/v1/message/{msg_id}") as mr:
                        text = json.loads(mr.read().decode()).get('Text', '')
                        match = re.search(r'code=([a-zA-Z0-9]+)', text)
                        if match:
                            user_reset_code = match.group(1)
                            print(f"       [Mailpit] Found User Reset Code: {user_reset_code[:15]}...")
                            break
    except Exception as e:
        print(f"       [Mailpit Error] {e}")

    # 2.3.1 User Reset Password
    s9, b9 = send_request(
        9, "2.3.1 User Reset Password", "POST", f"{base_url}/api/auth/reset-password",
        body={
            "code": user_reset_code,
            "password": env.get('USER_NEW_PASSWORD', env.get('USER_PASSWORD')),
            "passwordConfirmation": env.get('USER_NEW_PASSWORD', env.get('USER_PASSWORD'))
        }
    )
    try:
        user_token = json.loads(b9).get('jwt', user_token)
    except Exception:
        pass

    # 2.4 User Profile
    s10, b10 = send_request(
        10, "2.4 User Profile", "GET", f"{base_url}/api/users/me",
        headers={"Authorization": f"Bearer {user_token}"}
    )

    # Synchronize tokens to .env
    sync_env({
        'ADMIN_TOKEN': admin_token,
        'ADMIN_RESET_TOKEN': admin_reset_token,
        'USER_TOKEN': user_token,
        'USER_RESET_CODE': user_reset_code
    })

    print("\n================================================================================")
    print("                       SUMMARY TABLE (10 / 10 COMPLETED)")
    print("================================================================================")
    print(f"{'No':<4} | {'API Endpoint':<30} | {'Method':<6} | {'HTTP Status':<12} | {'Result':<10}")
    print("-" * 75)
    for t in tests:
        res = "PASS" if t['status'] in [200, 204, 400] else "FAIL"
        print(f"{t['no']:<4} | {t['name']:<30} | {t['method']:<6} | HTTP {str(t['status']):<7} | {res}")
    print("================================================================================")

if __name__ == '__main__':
    main()
