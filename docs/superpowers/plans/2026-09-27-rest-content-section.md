# REST Section 3 (Content Section) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement REST Section 3 (Content Section) for Student, Subject, and Teacher (Create, List All, List with ID, Update) across active and prototype REST files and environment configurations.

**Architecture:** Extend VS Code REST Client files (`api.rest` and `api.rest.simple`) following the existing dotenv variable pattern and Strapi v4 JSON API schema. Add corresponding environment variables in `.env` and `.env.example`.

**Tech Stack:** REST Client (VS Code .rest format), Strapi v4 REST API, Dotenv configuration, Git.

## Global Constraints
- Target branch is `feat/rest`.
- `.env` and `api.rest` must remain gitignored.
- `.env.example` and `api.rest.simple` must be tracked and committed to git.
- All dynamic fields use `{{$dotenv VAR_NAME}}` bindings.
- All requests use `Authorization: Bearer {{userToken}}`.
- Request bodies wrap payload in `{"data": { ... }}` per Strapi v4 standard.

---

### Task 1: Environment Variables Setup (.env.example & .env)

**Files:**
- Modify: `.env.example`
- Modify: `.env`

**Interfaces:**
- Produces: Environment variables for Student, Subject, and Teacher IDs and attributes.

- [ ] **Step 1: Append content section variables to `.env.example`**
Add the following block to `.env.example`:
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

- [ ] **Step 2: Append content section variables to `.env`**
Add the same block with default values to `.env` so active execution works immediately without missing variable warnings.

- [ ] **Step 3: Verify environment configuration**
Check that all newly added keys are present in both `.env` and `.env.example` using PowerShell:
```powershell
Get-Content .env.example | Select-String "STUDENT_|SUBJECT_|TEACHER_"
Get-Content .env | Select-String "STUDENT_|SUBJECT_|TEACHER_"
```
Expected: All 14 variables listed in both files.

- [ ] **Step 4: Commit `.env.example`**
```bash
git add .env.example
git commit -m "feat(env): add content section variables to .env.example"
```

---

### Task 2: Update REST Collection Prototype (`api.rest.simple`)

**Files:**
- Modify: `api.rest.simple`

**Interfaces:**
- Consumes: Environment variables from Task 1.
- Produces: Version-controlled prototype of Section 3 Content endpoints.

- [ ] **Step 1: Add variable declarations at top of `api.rest.simple`**
Below `@userToken = {{$dotenv USER_TOKEN}}`, add:
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

- [ ] **Step 2: Add Section 3 (Content Section) to `api.rest.simple`**
Append the following section to `api.rest.simple`:
```rest

## 3. Content Section

### 3.1 Student
### 3.1.1 Create
POST http://localhost:9093/api/students
Authorization: Bearer {{userToken}}
Content-Type: application/json

{
    "data": {
        "code": "{{studentCode}}",
        "firstname": "{{studentFirstname}}",
        "lastname": "{{studentLastname}}"
    }
}

### 3.1.2 List All
GET http://localhost:9093/api/students
Authorization: Bearer {{userToken}}

### 3.1.3 List with ID
GET http://localhost:9093/api/students/{{studentId}}
Authorization: Bearer {{userToken}}

### 3.1.4 Update
PUT http://localhost:9093/api/students/{{studentId}}
Authorization: Bearer {{userToken}}
Content-Type: application/json

{
    "data": {
        "firstname": "{{studentUpdateFirstname}}"
    }
}


### 3.2 Subject
### 3.2.1 Create
POST http://localhost:9093/api/subjects
Authorization: Bearer {{userToken}}
Content-Type: application/json

{
    "data": {
        "code": "{{subjectCode}}",
        "name": "{{subjectName}}"
    }
}

### 3.2.2 List All
GET http://localhost:9093/api/subjects
Authorization: Bearer {{userToken}}

### 3.2.3 List with ID
GET http://localhost:9093/api/subjects/{{subjectId}}
Authorization: Bearer {{userToken}}

### 3.2.4 Update
PUT http://localhost:9093/api/subjects/{{subjectId}}
Authorization: Bearer {{userToken}}
Content-Type: application/json

{
    "data": {
        "name": "{{subjectUpdateName}}"
    }
}


### 3.3 Teacher
### 3.3.1 Create
POST http://localhost:9093/api/teachers
Authorization: Bearer {{userToken}}
Content-Type: application/json

{
    "data": {
        "code": "{{teacherCode}}",
        "firstname": "{{teacherFirstname}}",
        "lastname": "{{teacherLastname}}"
    }
}

### 3.3.2 List All
GET http://localhost:9093/api/teachers
Authorization: Bearer {{userToken}}

### 3.3.3 List with ID
GET http://localhost:9093/api/teachers/{{teacherId}}
Authorization: Bearer {{userToken}}

### 3.3.4 Update
PUT http://localhost:9093/api/teachers/{{teacherId}}
Authorization: Bearer {{userToken}}
Content-Type: application/json

{
    "data": {
        "firstname": "{{teacherUpdateFirstname}}"
    }
}
```

- [ ] **Step 3: Verify `api.rest.simple` syntax and formatting**
Verify that `api.rest.simple` contains all 12 sub-sections and 14 new variable declarations.

- [ ] **Step 4: Commit `api.rest.simple`**
```bash
git add api.rest.simple
git commit -m "feat(rest): add section 3 content section to api.rest.simple prototype"
```

---

### Task 3: Update Active REST Collection (`api.rest`)

**Files:**
- Modify: `api.rest`

**Interfaces:**
- Consumes: Environment variables from Task 1 and prototype structure from Task 2.
- Produces: Functional local execution file `api.rest`.

- [ ] **Step 1: Mirror variable declarations and Section 3 into `api.rest`**
Apply the exact same additions to `api.rest` so that it stays 100% in sync with `api.rest.simple`.

- [ ] **Step 2: Compare `api.rest` and `api.rest.simple`**
Run:
```powershell
git diff --no-index api.rest api.rest.simple
```
Expected: No functional differences (empty diff or whitespace only).

- [ ] **Step 3: Verify git status**
Ensure `api.rest` is NOT staged or tracked:
```powershell
git status
```
Expected: `api.rest` is ignored / not listed as untracked.

---

### Task 4: Comprehensive Verification and Final Review

**Files:**
- Test / Verify: `.env.example`, `.env`, `api.rest.simple`, `api.rest`

- [ ] **Step 1: Run automated verification check**
Execute verification script to check:
1. All 14 variables defined in `.env.example` are present in `.env`.
2. All 14 variables referenced in `api.rest.simple` are defined at the top.
3. All 12 endpoints (3.1.1 - 3.1.4, 3.2.1 - 3.2.4, 3.3.1 - 3.3.4) are properly formatted with valid HTTP methods.
4. Git working directory state is clean.

- [ ] **Step 2: Commit any remaining tracked changes**
Ensure `git status` on branch `feat/rest` is clean.
