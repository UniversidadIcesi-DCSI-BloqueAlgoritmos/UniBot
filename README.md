# 🤖 UniBot (Versión IA Local)

**UniBot** es un chatbot de consola hecho en Node.js que ejecuta un modelo de Inteligencia Artificial directamente en tu computador. No necesita claves de API ni conexión constante a servicios externos como Gemini o ChatGPT.

---

## ¿Qué hace este proyecto?

1. **Saludo personalizado:** Te pide tu nombre al iniciar para conversar contigo en la terminal.

2. **IA 100% en tu equipo:** Descarga un modelo pequeño y ligero la primera vez que lo ejecutas y luego funciona directamente usando tu procesador y memoria RAM.

3. **Modo híbrido (Con o sin contexto):** Puedes darle un texto de referencia (por ejemplo, la información de un proyecto, un personaje o un reglamento) para que responda sobre eso, o hacerle preguntas generales de cualquier tema.

---

## Cómo ejecutarlo

Inicia el bot con:

   ```bash

   node app.js

   ```

> **💡 Nota importante:** La **primera vez** que ejecutes `node app.js`, verás que tarda unos minutos mientras descarga el modelo de IA a tu computador (aprox. 950 MB). En las siguientes ejecuciones abrirá en pocos segundos porque ya queda guardado en caché.

---

## ¿Cómo funciona el "Contexto" (`CONTEXTO_BASE`)?

Los modelos de IA pequeños son muy rápidos, pero no conocen datos específicos de tu universidad, de tu proyecto interactivo o de una historia que tú hayas inventado. 

Para eso existe la variable **`CONTEXTO_BASE`** dentro del archivo `utils/localLLMService.js`. Funciona como un "apunte" o ficha informativa que le entregas al bot antes de hablar con él:

- **Con contexto:** Si escribes información dentro de `CONTEXTO_BASE`, el bot la usará para responder con precisión cualquier duda sobre ese tema, sin inventar datos.

- **Contexto opcional / Preguntas libres:** Aunque tenga un contexto cargado, también puedes hacerle preguntas generales (pedirle ideas, definiciones o código básico). Si dejas la variable vacía (`const CONTEXTO_BASE = "";`), funcionará únicamente como un asistente general.

### Ejemplo de contexto incluido en el código

Actualmente, `utils/localLLMService.js` trae este texto de prueba simulando la información de un laboratorio:

```text

Reglamento y Servicios del Laboratorio de Prototipado (UniLab - Edificio B, Piso 3):

- Horario de atención: Lunes a viernes de 8:00 AM a 6:00 PM, y sábados de 9:00 AM a 1:00 PM.

- Equipos disponibles: 6 impresoras 3D de filamento PLA, 2 cortadoras láser y 10 estaciones con GPU para inteligencia artificial.

- Reservas: Todo estudiante debe reservar turno con al menos 24 horas de anticipación desde el portal web institucional. El tiempo máximo de uso por sesión es de 3 horas.

- Costos y materiales: El uso de las máquinas es gratuito para estudiantes activos, pero cada usuario debe traer su propio filamento PLA o láminas de madera MDF (máximo 4 mm de grosor).

- Coordinador del laboratorio: Ing. Carlos Mendoza (correo: cmendoza@unibot.edu). En caso de emergencia eléctrica, activar el botón rojo junto a la puerta principal.

```

---

## Preguntas para probar en clase

Una vez que el bot te salude en la terminal, puedes probar pegando estas preguntas:

### 1. Preguntas sobre el contexto (UniLab)

* `¿En qué edificio está el laboratorio UniLab y qué horario tiene los sábados?`

* `¿Cuánto cuesta usar las impresoras 3D y qué materiales debo llevar?`

* `Necesito usar la cortadora láser, ¿qué grosor máximo de madera permiten y cuánto dura el turno?`

* `¿A quién le escribo si tengo dudas del laboratorio y qué hago si hay una emergencia eléctrica?`



### 2. Preguntas libres (Conocimiento general del modelo)

* `Explícame en 3 líneas qué es una función asíncrona en JavaScript.`

* `Dame 3 ideas creativas para una instalación interactiva con sensores de sonido.`

* `Escribe un correo corto pidiendo permiso para presentar un proyecto un día después.`

* `¿Cuáles son los tres colores primarios de la luz (modelo RGB)?`

---

## ¿Cómo cambiar el modelo de IA por otro?

Si quieres probar otro modelo o sientes que tu computador va lento, abre el archivo **`utils/localLLMService.js`** y busca la línea:

```javascript

const MODEL_ID = process.env.LOCAL_MODEL_ID || "onnx-community/Qwen2.5-1.5B-Instruct";

```

Puedes reemplazar el texto entre comillas por cualquiera de estas opciones según tu equipo:

| Modelo (`MODEL_ID`) | Peso aprox. | ¿Cuándo usarlo? |
| :--- | :--- | :--- |
| `onnx-community/Qwen2.5-1.5B-Instruct` | ~950 MB | **Recomendado (Por defecto).** Entiende y redacta muy bien en español. |
| `onnx-community/Qwen2.5-0.5B-Instruct` | ~350 MB | **Ultraligero.** Ideal si tu computador tiene poca memoria RAM o quieres que responda casi al instante. |
| `onnx-community/Llama-3.2-1B-Instruct` | ~750 MB | Alternativa intermedia creada por Meta, buena para seguir instrucciones cortas. |

### ¿Cómo personalizar el proyecto a tu propio tema?

Solo debes abrir **`utils/localLLMService.js`**, borrar el texto del laboratorio dentro de **`CONTEXTO_BASE`** y escribir ahí las reglas de tu juego, la biografía de tu personaje o la guía de tu proyecto interactivo.