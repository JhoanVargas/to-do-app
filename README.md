# ✅ To-Do App

Esta es una aplicación simple de lista de tareas construida con **Ionic** y **Angular**.

## 📋 Requisitos previos

Antes de comenzar, asegúrate de tener instalados los siguientes frameworks:
- Node.js and npm
- Angular CLI (`npm install -g @angular/cli`)
- Ionic CLI (`npm install -g @ionic/cli`)
- Cordova CLI (`npm install -g cordova`)

## ⚙️ Instalación

1. Clona el repositorio:
   ```
   git clone https://github.com/JhoanVargas/to-do-app.git
   ```
2. Navega al directorio del proyecto:
   ```
   cd todo-list
   ```
3. Instala las dependencias:
   ```
   npm install
   ```

## Servidor de desarrollo

Ejecuta el siguiente comando para iniciar un servidor de desarrollo: `ng serve`. Luego abre tu navegador en `http://localhost:4200/`. La aplicación se recargará automáticamente si realizas cambios en los archivos fuente.

## 🤖 Compilación para Android

1. Agrega la plataforma Android:
   ```
   ionic cordova platform add android
   ```
2. Compila la aplicación Android:
   ```
   ionic cordova build android
   ```
   Esto generará un APK sin firmar en: `platforms/android/app/build/outputs/apk/debug/`. Recuerda tener instaladas las siguientes herramientas: Android Studio SDK, Java Development Kit (JDK), Gradle. Tambiés revisa las variables de entorno correspondientes

## Compilación para iOS

1. Agrega la plataforma iOS:
   ```
   ionic cordova platform add ios
   ```
2. Compila la aplicación iOS:
   ```
   ionic cordova build ios
   ```
   Esto generará un proyecto de Xcode en: `platforms/ios/`.

3. Abre el proyecto en Xcode y compila la aplicación para un simulador o dispositivo físico.
