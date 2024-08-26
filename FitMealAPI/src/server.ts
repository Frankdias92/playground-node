import { app } from "src/app";
import { env } from "./env";

app.listen({
    port: env.PORT || 3333,
    host: '0.0.0.0'
}, (err, address) => {
    if (err) {
        console.error(err)
        process.exit(1)
    }
    console.log(`Server running at ${address}`)
})