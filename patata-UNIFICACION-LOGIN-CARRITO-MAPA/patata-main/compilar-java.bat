@echo off
title Compilar Sistema de Ventas Java
echo ============================================
echo   COMPILANDO SISTEMA DE VENTAS (JAVA)
echo ============================================
if not exist bin mkdir bin
javac -encoding UTF-8 -d bin src\clientes\*.java src\login\*.java src\tienda\*.java src\ui\*.java
if %errorlevel% equ 0 (
    echo.
    echo [EXITO] Compilacion completada sin errores.
    echo Puedes ejecutar con 'ejecutar-java.bat'.
) else (
    echo.
    echo [ERROR] Hubo un problema al compilar.
)
echo.
pause
