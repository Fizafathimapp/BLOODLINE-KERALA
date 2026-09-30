# BloodNet Kerala — Demo

## What this demo contains
- Red/blue BloodNet Kerala interface inspired by the supplied reference images.
- Donation and Recipient registration.
- Blood group classification: A+, A-, B+, B-, O+, O-, AB+, AB-.
- Search by name, district, hospital or blood group.
- Donor/recipient filter.
- Demo records stored in the browser using localStorage.
- Phone numbers are masked in the visible record list.

## Run it
1. Extract the folder.
2. Open `index.html` in Chrome/Edge.
3. Click DONATION or RECIPIENT.
4. Add a demo record.
5. Use the filters to search.

No terminal is required for this first prototype.

## Important
This is NOT production-ready for a government hospital. localStorage is only for learning/prototyping. Real donor/patient data should be stored on a secure server with:
- authenticated hospital staff accounts
- role-based access control
- HTTPS/TLS
- server-side validation
- parameterized database queries
- encryption at rest where appropriate
- audit logs
- backups and recovery
- session timeout
- least-privilege database access
- privacy/data-retention policies

## Recommended next version
Frontend: HTML/CSS/JavaScript or React
Backend: Python Flask
Database: PostgreSQL (or SQLite only for a local learning version)
Authentication: secure server-side sessions / an established identity provider
