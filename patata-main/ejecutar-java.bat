@echo off
title Sistema de Ventas - Login y Tiendas (Java)
echo ============================================
echo   INICIANDO SISTEMA DE VENTAS (JAVA SWING)
echo ============================================
if not exist bin\login\LoginFrame.class (
    echo Compilando primero...
    call compilar-java.bat
)
java -cp bin login.LoginFrame
