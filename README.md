# 🔗 React URL Shortener

A simple and elegant React-based web application that allows users to shorten URLs with optional custom codes and expiry times. The app supports client-side persistence using localStorage and is styled using Material UI for a professional look.

---

## 📌 Features

-  Shorten long URLs instantly.
-  Optionally add a custom shortcode.
-  Set a validity period (in minutes) for each URL.
-  Add up to 5 URL entries at once.
-  Automatic redirection based on shortcode.
-  Data stored locally in the browser (no backend required).
-  Logs all events using a custom logger (stored in localStorage).

---

##  Technologies Used

| Technology         | Purpose                                                                 |
|--------------------|-------------------------------------------------------------------------|
| React              | Build reusable UI components and manage state                          |
| React Router DOM   | Handle client-side routing for navigation                              |
| Material UI (MUI)  | Style components with a consistent and responsive design system        |
| JavaScript (ES6+)  | Core language used for application logic                               |
| HTML5 & CSS3       | Structure and style the web page                                       |
| localStorage API   | Client-side persistence for URLs and event logging                     |

---

##  Folder Structure
```
url-shortener-app/
├── public/
│ └── index.html
├── src/
│ ├── pages/
│ │ ├── ShortenerPage.jsx
│ │ ├── RedirectPage.jsx
│ │ └── StatisticsPage.jsx
│ ├── middleware/
│ │ └── logger.js
│ ├── App.jsx
│ ├── App.css
│ └── index.js
└── package.json
```

##  How to Run the App
```
cd url-shortener-app
Install dependencies


npm install
Start the development server


npm start
```
### Open your browser and go to:
http://localhost:3000

### Routing Strategy
Route	Description
/	Main URL shortener form
/stats	URL statistics and logs (future scope)
/:shortcode	Redirect to original URL based on shortcode

 Data Modeling (localStorage)
Key	Stored Data Example
shortenedUrls	Array of { shortcode, original, validity } objects
logs	Array of logged events like URL submissions
