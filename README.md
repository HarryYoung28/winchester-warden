# Winchester Warden Whereabouts
_The application for Winchester's Fire Warden Community._

## What is this project

This is a [Next.js](https://nextjs.org) project implemented using [Microsoft Visual Studio Code](https://code.visualstudio.com) via [Microsoft Azure](https://azure.microsoft.com/en-gb) and [Github](https://github.com).

### Microsoft Azure Uses

| Service            | What is has been used for                                                                     |
| :---:              | :---:                                                                                         |
| Azure SQL Database | Holding all data related to project (including users, locations, and status of each building) |
| Azure App Service  | Hosting the website. Enabling the CI/CD pipeline via github.                                  |

## Instructions for use

This section will contain instructions for the systems usage split into general pages instructions, and specifics for admin and warden related pages.

For ***User Credentials*** in the use of testing of the application, please refer to the separately submitted *user-credentials.md* file. The *user-credentials.md* file **also** contains suggested, and detailed, instructions for the testing of the system to explore the functionality.

### General

#### Login
_https://winchester-warden-whereabouts.azurewebsites.net/login_

To sign in to an account, the user will enter their staff number and password. This process will be replaced with the University's Microsoft Entra Id Single Sign-On option once fully deployed. 

#### Forgot Password
_https://winchester-warden-whereabouts.azurewebsites.net/login/forgot-password_

The _forgot password?_ link will take you to an alternate page, where submitting will produce an alert, requesting that the user contacts Wichester KDS, as the SSO option transition process will be implemented in future releases and this feature will be retired.

Once the login has been verified they will be sent to their relevant home page.

#### Login Verification 

The login is verified by by comparing details entered by the user with details in the database. The password entered is in a password field (so that is it not easily viewed by watchers) and is ran through a salted bcrypt hashing algorithm to store in the database. 

| User Entry    | Database Element to Compare |
| :---:         | :---:                       |
| staffNumber   | staff_number                |
| password      | password_hash               |

### Admin

#### Dashboard
_https://winchester-warden-whereabouts.azurewebsites.net/admin/dashboard_

Once successfully logged in, any ***admin*** users will be directed to their dashboard. On this page displays information in two tables. 

The first of which titled **Locations Without Cover**, which shows all the buildings not currently occupied by a fire warden. 

The second table, **Winchester Warden Whereabouts**, shows a list of all wardens and their current working locations, with a date and time in which this had been updated.

At the top right of this page, is the _Sign Out_ button, which when activated will refresh the cookies (which store the information of who is logged in) and take the user to the _login_ page again.

At the top left of this page, are two buttons acting as page links. They are **Dashboard** and **Warden Management**, and take the user to the relevant page.

#### Warden Management
_https://winchester-warden-whereabouts.azurewebsites.net/admin/warden-management_

This page shares the same buttons as seen previously at the top left and top right (admin internal page redirects, and the sign out button).

It also contains a table of all listed wardens, showing their staff number, first name, last name, and three actions which will be detailed in the table below for their use. 

***Note:*** although user email is not _displayed_ in the table, it is infact accessible to be viewed, and changed if needed, via the _update_ action button in the table.

| Action            | Colour     | Use Case                                 |
| :---:             | :---:      | :---:                                    |
| Create New Entry  | Green      | Adding a new _warden_ to the database by implementing the Staff Number, First Name, Last Name, Email, and a Temporary password (which will be ran through a hashing algorithm to store safely) |
| Update            | Amber      | Updating existing warden details         |
| Delete            | Red        | Removing a warden from the database & system |

There are validations in place for ensuring two identical staff numbers cannot be entered into the database, both through the initial creation and throgh the updating of existing users. It is the responsibility of the administrator to ensure the information entered into the fields are accurate.

When _Delete_ is used, a warning will pop up with the name of the selected user, to give the administrator a chance to recover from mistakes and prevent incorrect user deletion. 

### Warden 
_https://winchester-warden-whereabouts.azurewebsites.net/warden_

#### Home Page

The warden home page is the only page accessible to warden users.

It displays a simple welcome message, with their name to confirm it is them signed in. It also shows their current working location, and when they last submitted this update.

There is a drop down menu, with all available working locations, to safely choose where they are currently working. To submit this choice, the user **must** select the green _update_ button.  This will cause the page to refresh, and reflect the working location submitted as confirmation to the User.    

The warden home page also contains the top right sign out button which will refresh the cookies upon sign out.

### Important Caveats/Notes

If signed in as an admin user, and trying to access a warden page via the URL, you will be redirected to the admin dashboard.

Likewise, if signed in as a warden user, and trying to access an admin page via the URL, you will be redirected to the warden dashboard.

If you are trying to access _any_ URL other than the login page and are not currently signed in, you will be pushed to the login page.






