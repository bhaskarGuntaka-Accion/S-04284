@echo off

WHERE node > nul 2> nul
IF %ERRORLEVEL% NEQ 0 ECHO Node wasn't found

for %%F in ("%~df0") do set basedir=%%~dpF

npm install && node %BASEDIR%\node\deploy.js %*