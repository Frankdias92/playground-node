import { app } from "src/app";

app.listen({
    port: 3333,
}).then(() => {
    console.log('Server running PORT', 3333)
})