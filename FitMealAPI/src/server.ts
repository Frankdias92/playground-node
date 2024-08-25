import { app } from "src/app";
import { env } from "./env";

app.listen({
    port: env.PORT,
}).then(() => {
    console.log('Server running PORT', env.PORT)
})