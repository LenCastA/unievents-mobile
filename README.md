# UniEvents Mobile

Aplicación móvil para descubrir eventos universitarios, consultar sus detalles, filtrarlos por categoría y guardar favoritos localmente.

## Funcionalidades

- Lista de 10 eventos con cards reutilizables.
- Filtros por Académico, Tecnología, Cultural, Deportes y Otros.
- Vista de detalle completa.
- Favoritos persistentes con AsyncStorage.
- Estados vacíos y diseño responsive orientado a Android.

## Tecnologías

React Native, Expo SDK 57, TypeScript, Expo Router y AsyncStorage.

## Estructura

```text
app/          Rutas y pantallas
components/   UI reutilizable y estado de favoritos
data/         Eventos mock
services/     Acceso a datos reemplazable por una API REST
storage/      Persistencia local
types/        Tipos del dominio
```

## Instalación y ejecución

```bash
npm install
npx expo start
```

Con Expo iniciado, presiona `a` para Android (requiere emulador) o escanea el QR con Expo Go.

## Posibles mejoras futuras

- Conectar `eventsService` a una API REST.
- Añadir búsqueda y filtros por fecha.
- Incorporar imágenes locales y recordatorios.
