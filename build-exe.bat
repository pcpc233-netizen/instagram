@echo off
chcp 65001 > nul
title CardFlow EXE 빌더

echo.
echo ╔══════════════════════════════════════╗
echo ║    CardFlow EXE 빌드 시작            ║
echo ╚══════════════════════════════════════╝
echo.

:: Node.js 확인
where node >nul 2>&1
if %errorlevel% neq 0 (
  echo [오류] Node.js가 설치되어 있지 않습니다.
  echo https://nodejs.org 에서 LTS 버전을 설치하세요.
  pause
  exit /b 1
)
for /f "tokens=*" %%i in ('node -v') do set NODE_VER=%%i
echo [OK] Node.js %NODE_VER%

:: .env 파일 확인
if not exist ".env" (
  echo.
  echo [경고] .env 파일이 없습니다!
  echo ANTHROPIC_API_KEY와 OPENAI_API_KEY를 .env 파일에 넣어야 합니다.
  echo.
  echo 예시:
  echo   ANTHROPIC_API_KEY=sk-ant-api03-...
  echo   OPENAI_API_KEY=sk-proj-...
  echo.
  pause
  exit /b 1
)
echo [OK] .env 파일 확인

:: 의존성 설치
echo.
echo [1/3] 패키지 설치 중...
call npm install
if %errorlevel% neq 0 (
  echo [오류] npm install 실패
  pause
  exit /b 1
)
echo [OK] 패키지 설치 완료

:: React 앱 빌드
echo.
echo [2/3] React 앱 빌드 중...
call npm run build
if %errorlevel% neq 0 (
  echo [오류] React 빌드 실패
  pause
  exit /b 1
)
echo [OK] React 빌드 완료

:: EXE 패키징
echo.
echo [3/3] EXE 파일 생성 중 (2~5분 소요)...
call npx electron-builder --win nsis --x64
if %errorlevel% neq 0 (
  echo [오류] EXE 빌드 실패
  pause
  exit /b 1
)

echo.
echo ╔═══════════════════════════════════════════════════════╗
echo ║  빌드 완료!                                           ║
echo ║  C:\cardflow-release\ 에서 설치 파일을 확인하세요.   ║
echo ╚═══════════════════════════════════════════════════════╝
echo.

:: 빌드 결과 폴더 열기
if exist "C:\cardflow-release" (
  explorer C:\cardflow-release
)

pause
