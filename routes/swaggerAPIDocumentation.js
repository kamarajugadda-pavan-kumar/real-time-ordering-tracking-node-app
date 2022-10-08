/**
 *@swagger
 *components:
 *   schemas:
 *     menu:
 *          type: object
 *          required:
 *            -name
 *            -image
 *            -price
 *            -size
 *          properties:
 *            id:
 *              type: string
 *              description: the auto-generated id of item in DataBase
 *            name:
 *              type: string
 *              description: Name of the item in menu
 *            image:
 *              type: string
 *              description: url (or) relative path (or) name of image file
 *            price:
 *              type: Number
 *              description: price of the item in menu
 *            size:
 *              type: string
 *              description: size of the item(small, medium , large)
 *          example:
 *            id: 63281b1a32e27d0e7f8a3f6c
 *            name: margaretta pizza
 *            image: margeretta.jpeg
 *            price: 500
 *            size: medium
 *
 *     order:
 *          type: object
 *          required:
 *            -customerId
 *            -items
 *            -phone
 *            -address
 *            -paymentType
 *            -status
 *          properties:
 *            id:
 *              type: string
 *              description: the auto-generated id of each order in DataBase
 *            customerId:
 *              type: string
 *              description: reference id of the user document in DataBase
 *            items:
 *              type: object
 *              properties:
 *                itemId:
 *                  type: object
 *                  $ref: "#/components/schemas/menu"
 *              description: list of items ordered by customer
 *            phone:
 *              type: Number
 *              description: phone number of the customer ,placing the order
 *            address:
 *              type: string
 *              description: address wehre the delivery needs to be made
 *            paymentType:
 *              type: string
 *              description: default payment option is set as COD
 *            status:
 *              type: string
 *              description: status of order ('order_placed','delivered'..etc)
 *          example:
 *            id: 63281b1a32e27d0e7f8a3f6c
 *            customerId: 63281b1a32e27d0e7f8a3f6c
 *            items: { "63281b1a32e27d0e7f8a3f68": { "item": { "_id": "63281b1a32e27d0e7f8a3f68", "name": "Double Chicken Sausage", "image": "Double Chicken Sausage.jpg", "price": 250, "size": "small" }, "qty": 2 }, "63281b1a32e27d0e7f8a3f69": { "item": { "_id": "63281b1a32e27d0e7f8a3f69", "name": "Italian Chicken Feast", "image": "Italian Chicken Feast.jpg", "price": 500, "size": "large" }, "qty": 2 }, "63281b1a32e27d0e7f8a3f6a": { "item": { "_id": "63281b1a32e27d0e7f8a3f6a", "name": "Malai Chicken Tikka", "image": "Malai Chicken Tikka.jpg", "price": 350, "size": "medium" }, "qty": 2 }, "63281b1a32e27d0e7f8a3f6b": { "item": { "_id": "63281b1a32e27d0e7f8a3f6b", "name": "Margherita", "image": "Margherita.jpg", "price": 200, "size": "small" }, "qty": 2 }, "63281b1a32e27d0e7f8a3f6c": { "item": { "_id": "63281b1a32e27d0e7f8a3f6c", "name": "Spiced Chicken Meatballs", "image": "Spiced Chicken Meatballs.jpg", "price": 600, "size": "large" }, "qty": 2 }, "63281b1a32e27d0e7f8a3f6d": { "item": { "_id": "63281b1a32e27d0e7f8a3f6d", "name": "Spiced Paneer", "image": "Spiced Paneer.jpg", "price": 500, "size": "medium" }, "qty": 2 } }
 *            phone: +91 7895864528
 *            address: sky view gachibowli
 *            paymentType: COD
 *            status: order_placed
 *     user:
 *          type: object
 *          required:
 *            -name
 *            -email
 *            -password
 *            -role
 *          properties:
 *            id:
 *              type: string
 *              description: the auto-generated id of each order in DataBase
 *            name:
 *              type: string
 *              description: Name of the customer
 *            email:
 *              type: string
 *              description: Email entered by the user for registering
 *            password:
 *              type: string
 *              description: password entered by user is stored by using salt and hashing
 *            role:
 *              type: string
 *              description: default role is set to customer(role can be changed to Admin only by direct access to Database)
 *          example:
 *             id: 63296ca4bf662d04877b2be9
 *             name: pavan
 *             email: pavankd12@gmail.com
 *             password: $2b$10$8bIoyhAxk2BQTTLEaCyaTumnjtGi2m4dHfHo1yh3xMomhk0j.k04i
 *             role: customer
 */

// swagger tags
/**
 * @swagger
 * tags:
 *  - name: home
 *    description: Home page API
 *
 *  - name: cart
 *    description: cart page API
 *
 *  - name: login
 *    description: login API
 *
 *  - name: logout
 *    description: logout API
 *
 *  - name: register
 *    description: register API
 *
 *  - name: orders
 *    description: orders API
 *
 *  - name: admin
 *    description: admin API
 */

// home
/**
 * @swagger
 * /:
 *  get:
 *    summary: Renders the home page(EJS template filled with Menu data from database)
 *    tags: [home]
 *    responses:
 *      200:
 *        description: Returns the home page HTML file as text/html, charset=utf-8
 *        content:
 *           text/plain:
 *            schema:
 *              type: string
 *              example: <html><head><meta charset="UTF-8"></head><body> <nav class="container mx-auto flex items-center justify-between py-4"></body></html>
 */

// cart
/**
 * @swagger
 * paths:
 *   /cart:
 *    get:
 *        summary: get all the items in the cart
 *        tags: [cart]
 *        responses:
 *            200:
 *                description: success, returns all the items added to the cart
 *                content:
 *                    text/plain:
 *                        schema:
 *                            type: string
 *                            example: <html><head><meta charset="UTF-8"></head><body> <nav class="container mx-auto flex items-center justify-between py-4"></body></html>
 *   
 *   /update-cart:
 *    post:
 *        summary: add an item to cart
 *        tags: [cart]
 *        responses: 
 *            200: 
 *                description: success, 
 *                content:
 *                    text/plain:
 *                        schema:
 *                            type: string
 *                            example: <html><head><meta charset="UTF-8"></head><body> <nav class="container mx-auto flex items-center justify-between py-4"></body></html>
 *  
 */

// login
/**
 * @swagger
 * paths:
 *  /login:
 *       get:
 *           summary: get the HTML page for login
 *           tags: [login]
 *           responses:
 *               200:
 *                   description: successful in loading login page
 *                   content:
 *                       text/plain:
 *                           schema:
 *                               type: string
 *                               example: <html><head><meta charset="UTF-8"></head><body> <nav class="container mx-auto flex items-center justify-between py-4"></body></html>
 *    
 */

/**
 * @swagger
 * paths:
 *  /login:
 *       post:
 *           summary: get the HTML page for login
 *           tags: [login]
 *           responses:
 *               200:
 *                   description: successful in loading login page
 *                   content:
 *                       text/plain:
 *                           schema:
 *                               type: string
 *                               example: <html><head><meta charset="UTF-8"></head><body> <nav class="container mx-auto flex items-center justify-between py-4"></body></html> 
 */

// logout
/**
 * @swagger
 *  /logout:
 *       post:
 *           summary: get the HTML page for login
 *           tags: [logout]
 *           responses:
 *               200:
 *                   description: successful in loading login page
 *                   content:
 *                       text/plain:
 *                           schema:
 *                               type: string
 *                               example: <html><head><meta charset="UTF-8"></head><body> <nav class="container mx-auto flex items-center justify-between py-4"></body></html>
 */

// register
/**
 * @swagger
 *  /register:
 *       get:
 *           summary: get the HTML page for login
 *           tags: [register]
 *           responses:
 *               200:
 *                   description: successful in loading login page
 *                   content:
 *                       text/plain:
 *                           schema:
 *                               type: string
 *                               example: <html><head><meta charset="UTF-8"></head><body> <nav class="container mx-auto flex items-center justify-between py-4"></body></html>
 */

/**
 * @swagger
 *  /register:
 *       post:
 *           summary: get the HTML page for login
 *           tags: [register]
 *           responses:
 *               200:
 *                   description: successful in loading login page
 *                   content:
 *                       text/plain:
 *                           schema:
 *                               type: string
 *                               example: <html><head><meta charset="UTF-8"></head><body> <nav class="container mx-auto flex items-center justify-between py-4"></body></html>
 */



// orders
/**
 * @swagger
 * paths:
 *  /orders:
 *       post:
 *           summary: get the HTML page for login
 *           tags: [orders]
 *           responses:
 *               200:
 *                   description: successful in loading login page
 *                   content:
 *                       text/plain:
 *                           schema:
 *                               type: string
 *                               example: <html><head><meta charset="UTF-8"></head><body> <nav class="container mx-auto flex items-center justify-between py-4"></body></html>
 * 
 *  /customer/orders:
 *      get:
 *           summary: get the HTML page for login
 *           tags: [orders]
 *           responses:
 *               200:
 *                   description: successful in loading login page
 *                   content:
 *                       text/plain:
 *                           schema:
 *                               type: string
 *                               example: <html><head><meta charset="UTF-8"></head><body> <nav class="container mx-auto flex items-center justify-between py-4"></body></html>
 *  
 *  /customer/orders/{id}:
 *      get:
 *           summary: get the HTML page for login
 *           tags: [orders]
 *           responses:
 *               200:
 *                   description: successful in loading login page
 *                   content:
 *                       text/plain:
 *                           schema:
 *                               type: string
 *                               example: <html><head><meta charset="UTF-8"></head><body> <nav class="container mx-auto flex items-center justify-between py-4"></body></html>
 */


// admin
/**
 * @swagger
 * paths:
 *  /
 */
