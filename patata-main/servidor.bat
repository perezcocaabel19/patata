@echo off
title Servidor Local - Ventas GO Huacho
echo =========================================================
echo       VENTAS GO - PLAZA DE ARMAS DE HUACHO (MAIN)
echo =========================================================
echo.
echo Iniciando servidor en http://localhost:8000...
echo.
start http://localhost:8000/index.html
python -m http.server 8000
if %errorlevel% neq 0 (
    echo Intentando con lanzador py...
    py -m http.server 8000
)
pause
