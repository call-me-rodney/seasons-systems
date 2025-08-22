# SEASONS SYSTEMS

* HR management
* Procurement management
* Equipment and Inventory Management
* Sales management
* Field management (e.g., land \& livestock)



## MANAGEMENT FEATURES

* Role-based data access (for each department, e.g., Admin \& User)
* Dashboard analytics.
* Seasons planner (AI)
* Basic settings page to manage user data and logouts.
* Seasons chat (interdepartmental communication channels)
* Data access, filtering, and manipulation (Admin)
* Super admin with access to all departmental analytics and reports, add or remove users, and assign user roles.



## DATABASE TABLES

* crop
* livestock
* field
* pen
* equipment
* inventory
* sales
* supplier
* employee
* resupply



##### SALES MANAGEMENT

Access to data and analytics concerning product sales.

**Users;**

* Enter data about the sales they have made.
* can only see sales for that day

**Admin;**

* Dashboard with sales analytics, e.g., items sold, item filters, best-selling categories.
* Predicted sales data based on performance, current inventory, and the season ahead (Seasons Planner).
* Seasons chat



Database tables dealt with: Sales, Inventory(read only)



##### PROCUREMENT MANAGEMENT

Access to records, analytics, and statuses for product stock and resupply

**Admin;**

* Approve resupply requests made by equipment staff
* Track order statuses
* confirm and validate item delivery and quality
* manages supplier relations
* get suggestions on what to approve based on available equipment and the season ahead (Seasons Planner)
* seasons chat



Database tables dealt with: resupply, equipment(read-only), supplier



##### EQUIPMENT AND INVENTORY MANAGEMENT

Access to inventory and management of available stock

**User;**

* Check and confirm the quality status of stock
* Enter new stock or deduct stock going out or damaged
* Track who is using what equipment.

**Admin;**

* Analytics and monitoring of equipment use.
* Monitoring of inventory use
* Make resupply requests to the procurement department for equipment.
* Get suggestions on what to restock, as well as be alert to potential misuse of equipment (Seasons Planner)
* seasons chat



Database tables dealt with: inventory, equipment



##### HR MANAGEMENT

Access to employee records as well as managing them

**Admin;**

* Enter new staff
* Update employee status and records
* Lay off staff (by updating is\_active field)
* Analytics on staff numbers per department
* Suggestions on which departments are under- or over-staffed (Seasons Planner)
* seasons chat



Database tables dealt with: employee



##### FIELD MANAGEMENT

Access to records and analytics concerning the state of the farm

**User (roles based on which asset they manage);**

* Enter new livestock or crop batches
* Enter what pen or field they are assigned to
* Update the status of livestock or crops
* Track harvest periods for those dealing with crops
* Update the statuses of fields or pens

**Admin;**

* Analytics and monitoring of farm assets such as animals and harvest operations
* Suggestions and reminders for stuff like likely disease outbreaks and upcoming harvest operations (seasons planner)
* seasons chat



Database tables dealt with: Livestock, Crop, Pen, Field



## TECHNICAL OVERVIEW

#### FRONT FACING INTERFACE DETAILS

* The application has a green, orange, and white colour palette. 
* The application begins with a login page where users enter their enterprise email addresses and passwords.
* Once auth is complete, the user is redirected to their respective dashboard based on user department and role (Admin or User)
* Nav menus are on the left side of the screen, where tabs such as Analytics, Chat, Planner, Settings, etc, are found.
* The top bar contains the seasons logo to the left of the bar.
* When a user gets a chat or suggestion from the seasons planner, a number badge will appear on the tab.



##### GENERAL FEATURES.

**Seasons Chat**

* An in-app chat service available to all users, where they can communicate with each other via text message.
* Admins can broadcast messages to all employees in their respective departments (internal memos).
* Chats similar to WhatsApp, where you either search for someone and send them a message or continue a current chat.



**Seasons Planner** 

* An AI-powered planning interface that houses a calendar marked with important events, either by the AI once approved by the user or added by the user themselves.
* Depending on the department, the AI will give suggestions based on database data, forecasts, or company memos to aid with quick fore planning.
* These suggestions arrive in a chat window once the seasons planner tab is clicked, chat window on the left and the calendar to the right.
* The chat window is similar to those for VSCode AI chat windows, where the AI suggests a change and you select a button to confirm the change, i.e., adding a calendar event.
* This feature is available to Admins and Super admins only since they get analytics, monitor assets, and plan for the future.



**Settings**

* Users can view or edit their account details here.
* Option for logging out of one's account.
* Switch between light and dark modes.



#### DEPARTMENTAL DASHBOARD SPECIFICS.

##### SALES MANAGEMENT.

Users;

* Tabs: Dashboard, Seasons Chat, Settings.
* On their dashboard, as described earlier, they will have an interface that will allow them to enter details of a sale made
* At the close of day, the totals are made and the data is sent to the sales Admin once book balancing is completed. (Sales will appear in spreadsheet form with the totals at the bottom. Once the day is complete, users click a confirmation button to have the data sent to the admin for review.)

Admin;

* Tabs: Analytics, Seasons Chat, Seasons Planner, Settings
* Analytics here highlight sales volumes, sales by inventory item, sales by employees, and 7-day performance comparisons, perhaps via a bar graph.
* Capability to filter through analytics to get metrics for specific items, like the highest performing inventory stock or the best performing employee.
* Seasons Planner AI will make suggestions on which products to stock more or less in inventory based on performance metrics, as well as what may sell more in the future based on forecasts and past trends. Adds these sales periods to the calendar
* Able to send memos to all users in the sales department.



##### PROCUREMENT MANAGEMENT.

Admin;

* Tabs: Dashboard, Seasons Chat, Seasons Planner, Settings.
* On the procurement manager's dashboard, they are able to review and approve or deny resupply requests made by those in the equipment and inventory team.
* They can view the current state of equipment in inventory to help with these decisions.
* Once approved, they enter the resupply details into the database, send the order to the respective supplier, and monitor delivery status.
* Update resupply status.
* Edit and manage lists of suppliers the company works with.
* Seasons Planner suggests which requests to approve and marks delivery dates and restock periods on the calendar.



##### EQUIPMENT AND INVENTORY MANAGEMENT

User;

* Tabs: Dashboard, Seasons Chat, Settings
* In the dashboard, those who manage equipment (items used to accomplish work on the farm, like tools, seeds, fertilizer, or tractors) or those who manage inventory (finished products from the field to be sold) will have access to monitor and edit the state of their respective stores. Entering new items, removing those that are taken or damaged, and confirming no item has been taken or stolen.
* Searches and filters to help them query specific items quickly.
* Users with the inventory role only see inventory, while those in the equipment role only see equipment.

Admin;

* Tabs: Analytics, Seasons Planner, Seasons Chat, Settings.
* Under analytics, store managers have graphs and charts that show equipment health, items in use, item misuse, item use per department, as well as next scheduled restocks.
* Seasons Planner can suggest which items are being misused, what is lacking, so as to schedule a restock and send a resupply request to the procurement admin. Add resupply dates to the calendar



##### HR MANAGEMENT

Admin;

* Tabs: Analytics, Staff, Seasons Planner, Seasons Chat, Settings
* In analytics, HR admins are able to view how many active workers are available, with filters for department, age, and gender.
* In staff, this is where HRs enter new staff and update data for existing staff, including changing the active status to show that a worker has been fired.
* Seasons Planner suggests which departments are over- or understaffed based on departmental performance.



##### FIELD MANAGEMENT.

User;

* Different roles have different data that they can manipulate, i.e., Pens, Fields, Crops, and Livestock.
* Tabs: Dashboard, Seasons Chat, Settings.
* In their respective dashboards, users can update and monitor the state of assets in the field, such as updating if a pen is full, if certain livestock have fallen sick, etc.

Admin;

* Tabs: Analytics, Seasons Planner, Seasons Chat, Settings
* Under analytics, an admin is able to see how many assets are available, harvest volumes by crop, track pen or field use, and monitor general asset health.
* Seasons Planner suggests when to carry out fertilizing, pen cleaning, or even quarantine when the risk of a disease outbreak is imminent, based on database data. It can also suggest what to pick from the equipment to help with this, and if what is needed isn't in the equipment, it suggests items to stock up on.



##### SUPER ADMIN.

* This individual has access to all dashboards and analytics for all departments. 
* Tabs: Analytics tab for each department, Staff, Seasons Planner, Seasons Chat, Settings
* Under analytics, the super admin gets daily reports on the performance of each department. 
* Under staff, the super admin can add other Admins and hand them roles which dictate what department they get to control.
* Super admin can also change user roles or delete them entirely.



### DATABASE SCHEMA.

##### CROP

* cropID (new crop id per new batch in a season, collected from equipment to be placed on a field)
* type (corn, wheat, sugar)
* plantingDate
* expectedHarvestDate
* actualHarvestDate
* yieldQuantity
* yieldUnit (tons, kgs, bundles)
* field (field id where crop is being grown)
* status (growing, harvested)
* is\_infested
* infestation



##### LIVESTOCK

* animalID (new animal id once bought or acquired)
* species/type (pigs, cattle)
* breed (e.g cattle breed like Angus)
* birthDate
* acquisitionDate
* is\_healthy
* affliction
* pen (pen id keeping the animal)
* status (active, sold, dead)



##### FIELD

* fieldID
* location/name(C8)
* size
* soilType
* lastFertilizedDate
* is\_active



##### PEN

* penID (pk)
* location/name
* type (e.g. sty)
* capacity
* lastCleanedDate
* is\_full



##### EQUIPMENT

* equipmentID (pk)
* name (corn seeds, hammer)
* model
* purchaseDate
* status (new, damaged, decommissioned, worn out)
* supplier (id of the supplier)
* is\_inuse
* employee (id of employee currently using the equipment)



##### INVENTORY

* itemID (pk)
* name (beef, corn, tea, seeds, fertilizer)
* quantity
* units
* pricePerUnit
* expiryDate
* cropID (id of crop batch that provided stock)
* animalID (id of animal that provided stock)
* type (crop\_produce, meat\_produce)



##### SALES

* saleID (pk)
* saleDetails (id of details of this particulat sale)
* saleDate
* employee (id of employee that made the sale)



##### SALES DETAILS

* salesDetailsID
* item (id of inventory item sold)
* quantitySold
* unitPrice
* saleTotal
* payementMethod



##### SUPPLIER

* supplierID (pk)
* name
* contacts
* address
* specialty/service



##### EMPLOYEE

* employeeID (pk)
* name
* role
* dateOfHire
* dateOfFire
* contact
* is\_active



##### RESUPPLY

* requestID (pk)
* requestDate
* item (id of equipment)
* supplier (supplier id)
* quantity
* unit price
* subtotal
* deliveryDate
* invoiceNo



**Relationships**

* Field to Crop - one:many (One field having one or two crop types or batches)
* Pen to Livestock - one:many (One pen holds multiple animals)
* Supplier to Equipment - one:many (one supplier supplies multiple equipment)
* Employee to Equipment - one:many (an employee can use multiple tools)
* Crop to Inventory - one:many (one crop can produce multiple inventory items)
* Livestock to Inventory - one:many (one animal produces multiple items)
* Inventory to Sales details - one:many (one product has multiple sales)
* Sale to Sale details - one to one (a sale only has one set of details)
* Employee to Sale details - one:many (one employee executes multiple sales)
* Supplier to Resupply - one:many (one supplier can have multiple invoices)



#### CODE BASE.

##### FRONTEND

* React + Vite.
* Tailwind CSS for styles
* Shadcn/ui for analytics components and professional design.
* Axios for HTTP calls
* React Router Dom.
* Dockerfile (for project containerization)



##### BACKEND

* Node + Express
* Neon Postgres database (sends and fetches data from neon db)
* Controllers directory that defines functions to execute application logic.
* Routes directory to define REST API endpoints to expose controllers.
* Endpoint access is granted based on auth and user role.
* DB directory to define schema, set up database configs, and house functions for connecting to the DB and performing other DB operations.
* Configs directory where environment variables are passed to variables and made accessible to the rest of the application.
* Utilities directory to define functions for logging and other operations.
* Entry point script that starts the server after initializing endpoints, defining CORS, initializing db connections, etc.
* Dockerfile (for backend containerization)



##### AI

* official ollama Docker image from Docker Hub
* mounted to a volume for persistence of AI models downloaded and used.
* Accessible to the backend via Docker container network defined in Docker Compose.



##### OTHER FILES

* docker-compose.yaml to define how to orchestrate the containers to start and communicate with each other, provide health checks, and feed .env contents to the backend container. Must also ensure the ollama container is mounted to the right volume.
* .gitignore for excluding relevant files from being pushed to GitHub.



## SECURITY & AUTHENTICATION

* User authentication will be implemented using secure methods such as JWT (JSON Web Tokens) or OAuth.
* Session tokens will have a validity of one day (24 hours) to balance security and user convenience.
* Passwords will be securely hashed and stored using industry-standard encryption algorithms.
* Audit logs will be maintained to track key actions and changes within the system for accountability and compliance.

## NOTIFICATIONS

* The system will feature a notification system to alert users of important events, such as resupply approvals, AI suggestions, and other critical updates.
* Notifications will be delivered as toast notifications on the frontend for immediate, non-intrusive feedback.

## REDIS INTEGRATION

### Adding Redis to the Project

1. **Docker Compose Setup**
   - Add the official Redis image as a service in your `docker-compose.yaml`:

```yaml
db:
  image: postgres:latest
  # ... existing db config ...

redis:
  image: redis:latest
  container_name: redis
  ports:
    - "6379:6379"
  volumes:
    - redis_data:/data

volumes:
  redis_data:
```

2. **Backend Integration**
   - Install a Redis client library for Node.js (e.g., `ioredis` or `redis`).
   - Example installation:
     ```bash
     npm install ioredis
     ```
   - Example usage in your backend:
     ```js
     const Redis = require('ioredis');
     const redis = new Redis({ host: 'redis', port: 6379 });
     // Use redis for caching, pub/sub, session storage, etc.
     ```

3. **Use Cases in Seasons Systems**
   - **Session Management:** Store session tokens or blacklists for JWT invalidation.
   - **Caching:** Cache frequent queries (e.g., analytics, AI suggestions).
   - **Real-Time Chat & Notifications:** Use Redis Pub/Sub for chat messages and toast notifications.
   - **Job Queues:** Manage background jobs (e.g., sending emails, processing reports).
   - **Rate Limiting:** Prevent abuse by tracking API usage per user.

4. **Environment Variables**
   - Add Redis connection details to your `.env` file:
     ```env
     REDIS_HOST=redis
     REDIS_PORT=6379
     ```

5. **Health Checks**
   - Optionally, add health checks for Redis in your Docker Compose to ensure the service is running.

### Benefits
- Improved performance, scalability, and real-time capabilities for your application.





