@echo off
timeout /t 2 >nul
set /a exitCode=%RANDOM% %% 2
exit /b %exitCode%
