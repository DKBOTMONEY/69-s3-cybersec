# Design Specification: REST Section 3 (Content Section)

## 1. Overview
This specification details the addition of REST Section 3 (Content Section) covering Student, Subject, and Teacher resource endpoints in Strapi v4. It aligns with existing conventions established in Sections 1 (Admin) and 2 (User) of `api.rest` and `api.rest.simple`.

## 2. Scope & Target Files
- `api.rest`: Active REST client execution file (gitignored).
- `api.rest.simple`: Version-controlled template/prototype for the REST collection.
- `.env`: Active local environment credentials and content variables (gitignored).
- `.env.example`: Template for environment variables with safe defaults.

## 3. Environment Variables
The following environment variables will be declared at the top of `api.rest` and `api.rest.simple` using the `{{$dotenv VAR}}` pattern:

```rest
@studentId = {{$dotenv STUDENT_ID}}
@studentCode = {{$dotenv STUDENT_CODE}}
@studentFirstname = {{$dotenv STUDENT_FIRSTNAME}}
@studentLastname = {{$dotenv STUDENT_LASTNAME}}
@studentUpdateFirstname = {{$dotenv STUDENT_UPDATE_FIRSTNAME}}

@subjectId = {{$dotenv SUBJECT_ID}}
@subjectCode = {{$dotenv SUBJECT_CODE}}
@subjectName = {{$dotenv SUBJECT_NAME}}
@subjectUpdateName = {{$dotenv SUBJECT_UPDATE_NAME}}

@teacherId = {{$dotenv TEACHER_ID}}
@teacherCode = {{$dotenv TEACHER_CODE}}
@teacherFirstname = {{$dotenv TEACHER_FIRSTNAME}}
@teacherLastname = {{$dotenv TEACHER_LASTNAME}}
@teacherUpdateFirstname = {{$dotenv TEACHER_UPDATE_FIRSTNAME}}
```

### Values in `.env.example`
```env
# Content Section Variables (Student, Subject, Teacher)
STUDENT_ID=1
STUDENT_CODE=STD001
STUDENT_FIRSTNAME=Somchai
STUDENT_LASTNAME=Jaidee
STUDENT_UPDATE_FIRSTNAME=Somchai_Updated

SUBJECT_ID=1
SUBJECT_CODE=CS101
SUBJECT_NAME=Cyber Security
SUBJECT_UPDATE_NAME=Advanced Cyber Security

TEACHER_ID=1
TEACHER_CODE=TCH001
TEACHER_FIRSTNAME=Prawee
TEACHER_LASTNAME=Wongsa
TEACHER_UPDATE_FIRSTNAME=Prawee_Updated
```

### Values in `.env`
Identical default values will be appended to `.env` to enable immediate execution without missing variable errors.

## 4. Endpoints Specification (Section 3. Content Section)

All requests include `Authorization: Bearer {{userToken}}` and JSON request bodies follow the Strapi v4 `{"data": { ... }}` structure.

### 3.1 Student
- **3.1.1 Create**
  - Method: `POST`
  - URL: `http://localhost:9093/api/students`
  - Headers:
    - `Authorization: Bearer {{userToken}}`
    - `Content-Type: application/json`
  - Body:
    ```json
    {
        "data": {
            "code": "{{studentCode}}",
            "firstname": "{{studentFirstname}}",
            "lastname": "{{studentLastname}}"
        }
    }
    ```
- **3.1.2 List All**
  - Method: `GET`
  - URL: `http://localhost:9093/api/students`
  - Headers:
    - `Authorization: Bearer {{userToken}}`
- **3.1.3 List with ID**
  - Method: `GET`
  - URL: `http://localhost:9093/api/students/{{studentId}}`
  - Headers:
    - `Authorization: Bearer {{userToken}}`
- **3.1.4 Update**
  - Method: `PUT`
  - URL: `http://localhost:9093/api/students/{{studentId}}`
  - Headers:
    - `Authorization: Bearer {{userToken}}`
    - `Content-Type: application/json`
  - Body:
    ```json
    {
        "data": {
            "firstname": "{{studentUpdateFirstname}}"
        }
    }
    ```

### 3.2 Subject
- **3.2.1 Create**
  - Method: `POST`
  - URL: `http://localhost:9093/api/subjects`
  - Headers:
    - `Authorization: Bearer {{userToken}}`
    - `Content-Type: application/json`
  - Body:
    ```json
    {
        "data": {
            "code": "{{subjectCode}}",
            "name": "{{subjectName}}"
        }
    }
    ```
- **3.2.2 List All**
  - Method: `GET`
  - URL: `http://localhost:9093/api/subjects`
  - Headers:
    - `Authorization: Bearer {{userToken}}`
- **3.2.3 List with ID**
  - Method: `GET`
  - URL: `http://localhost:9093/api/subjects/{{subjectId}}`
  - Headers:
    - `Authorization: Bearer {{userToken}}`
- **3.2.4 Update**
  - Method: `PUT`
  - URL: `http://localhost:9093/api/subjects/{{subjectId}}`
  - Headers:
    - `Authorization: Bearer {{userToken}}`
    - `Content-Type: application/json`
  - Body:
    ```json
    {
        "data": {
            "name": "{{subjectUpdateName}}"
        }
    }
    ```

### 3.3 Teacher
- **3.3.1 Create**
  - Method: `POST`
  - URL: `http://localhost:9093/api/teachers`
  - Headers:
    - `Authorization: Bearer {{userToken}}`
    - `Content-Type: application/json`
  - Body:
    ```json
    {
        "data": {
            "code": "{{teacherCode}}",
            "firstname": "{{teacherFirstname}}",
            "lastname": "{{teacherLastname}}"
        }
    }
    ```
- **3.3.2 List All**
  - Method: `GET`
  - URL: `http://localhost:9093/api/teachers`
  - Headers:
    - `Authorization: Bearer {{userToken}}`
- **3.3.3 List with ID**
  - Method: `GET`
  - URL: `http://localhost:9093/api/teachers/{{teacherId}}`
  - Headers:
    - `Authorization: Bearer {{userToken}}`
- **3.3.4 Update**
  - Method: `PUT`
  - URL: `http://localhost:9093/api/teachers/{{teacherId}}`
  - Headers:
    - `Authorization: Bearer {{userToken}}`
    - `Content-Type: application/json`
  - Body:
    ```json
    {
        "data": {
            "firstname": "{{teacherUpdateFirstname}}"
        }
    }
    ```

## 5. Verification Plan
1. Check syntax and formatting consistency in `api.rest` and `api.rest.simple`.
2. Ensure variable names match between `.env`, `.env.example`, `api.rest`, and `api.rest.simple`.
3. Verify git tracking status: `.env` and `api.rest` remain untracked / ignored; `.env.example` and `api.rest.simple` are tracked and staged/committed as required.
