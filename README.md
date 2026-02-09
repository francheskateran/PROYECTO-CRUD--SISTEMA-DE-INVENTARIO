# PROYECTO-CRUD--SISTEMA-DE-INVENTARIO

# Módulo de Inventario PST - Programación II

Este proyecto consiste en el desarrollo de un módulo funcional de mantenimiento (CRUD) para una tabla maestra de productos, desarrollado bajo la arquitectura *MVC* y utilizando el stack *Flask (Python) + MySQL*.

## 🚀 Integrantes
* ANDRÉS FLORES C.I 31.345.684
* ALBANY ARRAIZ C.I: 31.528.019
* FRANCHESKA TERÁN C.I: 31.223.802
* MIGUEL SOLÓRZANO – C.I: 31.962.184

  
## 🛠️ Especificaciones Técnicas
* *Lenguaje:* Python 3.x
* *Framework:* Flask
* *Base de Datos:* MySQL Workbench
* *Interfaz:* HTML5, Tailwind CSS (Diseño Moderno/Glassmorphism)
* *Validaciones:* Doble capa (Cliente en JS y Servidor en Python)

## 📊 Tabla Maestra: productos
La tabla cuenta con los siguientes campos requeridos:
1. codigo_barras (String Único)
2. nombre (String - Validado contra solo números)
3. descripcion (Text)
4. precio (Decimal - Validado contra negativos)
5. stock (Integer - Validado contra negativos)
6. activo (Boolean)

## 🔧 Instrucciones de Instalación

1. *Clonar el repositorio:*
   ```bash
   git clone [URL_DE_TU_REPOSITORIO]
   cd [NOMBRE_CARPETA]
