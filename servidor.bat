@echo off
title Servidor Ventas GO
cd /d "%~dp0"
echo Iniciando servidor... no cierres esta ventana.
python servidor.py
if errorlevel 1 (
  echo.
  echo No se encontro Python. Instalalo desde https://www.python.org/downloads/
  pause
)
