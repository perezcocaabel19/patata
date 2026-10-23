@echo off
title Subir Proyecto a GitHub - Ventas GO
echo ========================================================
echo       SUBIENDO PROYECTO UNIFICADO A GITHUB (MAIN)
echo ========================================================
echo.
cd /d "%~dp0"
echo Repositorio: https://github.com/perezcocaabel19/patata.git
echo Rama: main
echo Usuario: johanpachecomanrique25-spec
echo.
echo Ejecutando git push...
git push -u origin main
echo.
if %errorlevel% equ 0 (
    echo ========================================================
    echo   [EXITO] El proyecto se subio correctamente a GitHub!
    echo ========================================================
) else (
    echo ========================================================
    echo   [AVISO] Hubo un problema de autenticacion.
    echo ========================================================
)
echo.
pause
