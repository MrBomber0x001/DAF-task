const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const orderRoutes = require('./routes/order.routes.js');
const authRoutes = require('./routes/auth.routes.js');
const productRoutes = require("./routes/product.routes.js");
const helmet = require('helmet');


// Server Configurations
// dotenv.config();
const app = express();
const PORT = 3000;

// middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan('short'));

// Routes

orderRoutes(app);
authRoutes(app);
productRoutes(app);


// Error handling Middleware
app.use((err, req, res, next) => {
    res.send(err);
})

app.listen(PORT, () => {
    console.log(`server is running`);
})
