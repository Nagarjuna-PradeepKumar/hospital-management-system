# hospital-management-system
This is a hospital management application that can be used in small hospitals and clinics.

## Heroku demo
Try hospital management system with the Heroku demo<br>
Link to demo ----> [Hospital management system](https://clinicmanagement.herokuapp.com/)<br>

***Login id's for the demo app***
1. **To login as Administrator**
  - username : administrator
  - phone number:9876543210
  - password : password
2. **To login as Receptionist**
  - username : receptionist
  - phone number:1122334455
  - password : password
3. **To login as Doctor**
  - username : doctorstrange
  - phone number:9988776655
  - password : password
  
### Made with
This project is made with ***Vuejs, Nodejs and Mongodb***.

### What do you have?
**You have three types of users**
- **Administrator**
  - Has privilege of both administrator and receptionist.
  - Can create,edit,delete new user, add,edit new patient details.
  - Create calendar plans for attenddence marking.
  - Mark attendence for the users.
  - Calculate monthly attendence for users.
- **Receptionist**
  - Create new patient, edit patient details.
  - Generate tokens for the patients who has visited the clinic or hospital.
- **Doctor**
  - Add patient history.
  - Add complaints of patients, interpret the complaints
  - Suggest medicines to patients.
  - Suggest labtests, store the results of the same.
 
 ### Future upgradation plans
 1. Change the que tab with websocket. So that you do not need to press refresh every time.
