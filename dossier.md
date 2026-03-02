# Dossier



## 📋 Studentgegevens

**Student:** BEKIR AYTAC KARAKUS  
- **Studentennummer:** 202406918  
- **E-mailadres:** bekir.karakus@student.hogent.be  
- **GitHub repository:** [https://github.com/<jouw-github-username>/<repo-naam>  ](https://github.com/HOGENT-frontendweb/frontendweb-2526-aytac)
- **Online versie (Back-end):** [https://<jouw-backend>.onrender.com  ](https://barber-vpi9.onrender.com)
- **Demo:** 

## 🔐 Logingegevens

### Lokale omgeving

- **E-mailadres:** admin.user@hogent.be  
- **Wachtwoord:** 12345678  
- **Rol:** admin  

### Online omgeving

- **E-mailadres:** admin.user@hogent.be  
- **Wachtwoord:** 12345678  
- **Rol:** admin

  
## 📖 Projectbeschrijving

> ## Projectbeschrijving

Mijn project is een **online afspraken­systeem voor een kapperszaak**.  
Het doel van deze applicatie is om klanten op een eenvoudige en gebruiksvriendelijke manier online afspraken te laten boeken bij een kapper.  
De toepassing helpt de kapper om zijn agenda digitaal te beheren, dubbele boekingen te vermijden en een duidelijk overzicht te behouden van alle geplande afspraken.

### Doelgroep
De applicatie is bedoeld voor **klanten van één specifieke kapper** en voor de kapper zelf.  
Klanten kunnen via een eenvoudige interface beschikbare tijdsloten bekijken, een gewenste dienst kiezen (zoals knippen, scheren of kleuren) en een afspraak reserveren.  
De kapper kan zijn werktijden instellen, verlofdagen beheren en alle afspraken in één overzicht raadplegen.

### Functionaliteiten

- Gebruikersregistratie en login (JWT)
- Beheer van diensten (services)
- Beheer van werkuren
- Beheer van verlofdagen (time-off)
- Afspraken aanmaken, wijzigen en verwijderen
- Automatische controle op overlappende afspraken
- Transacties koppelen aan afspraken
- Rol-gebaseerde toegang (admin / user)

### Doel
Het project heeft als doel om het planningsproces van de kapperszaak te **automatiseren**, **tijd te besparen** en **fouten te vermijden**.  
Door digitalisering kunnen klanten 24/7 een afspraak inplannen en hoeft de kapper geen manuele agenda meer bij te houden.



## ERD
<img width="428" height="723" alt="Screenshot 2025-10-17 at 16 30 24" src="https://github.com/user-attachments/assets/fbdac4d2-94de-4e50-b398-efedcd1a9f00" />

-[ERD](https://kroki.io/erd/svg/eNptj0sKwzAMRPc6RdaBLHqEnqF0ZYoxsUJMasnIckNvXyduoIVs9EFvBo25Z5T8gD54IBcR0syEgNGFJ4C5obzCiL-AL-I0MNncbpBkq2BWlsXOXA67FXHx7g1ZnajVULVIvg1gtmZ5mhrbGKc7UZugy0wVu6bEgRQjkn59x5KVI4rddO0He2JRdy0ZYA_YXYah7_7M4Mh2dgP4AHZLYlQ=)


### Belangrijkste entiteiten en relaties

De belangrijkste entiteiten in deze applicatie zijn:

- **Users** → klanten en admins  
- **Services** → aangeboden diensten  
- **Work_hours** → standaard werkuren per weekdag  
- **Time_off** → uitzonderingen zoals verlof  
- **Appointments** → afspraken tussen klant en kapper  
- **Transactions** → betalingen gekoppeld aan afspraken  

**Relaties:**
- Eén **user** kan meerdere **appointments** hebben → `users 1--* appointments`.  
- Eén **service** kan in meerdere **appointments** voorkomen → `services 1--* appointments`.
- `appointments 1--1 transactions`
- De tabellen **work_hours** en **time_off** zijn rechtstreeks gelinkt aan de kapper zelf (en dus niet aan een aparte ‘barber’-entiteit, aangezien er slechts één kapper is in dit project).


## ✅ Ontvankelijkheidscriteria

- [x] Het project van Web Services voldoet aan **alle** ontvankelijkheidscriteria zoals beschreven in de rubrics.
- [ ] Het project van Front-end Web Development voldoet aan **alle** ontvankelijkheidscriteria zoals beschreven in de rubrics.

## 🚀 Extra technologieën

- **Drizzle ORM**  
  - Type-safe ORM met expliciete migraties  
- **JWT (JSON Web Tokens)**  
  - Voor veilige authenticatie en autorisatie  
- **Docker**  
  - Voor consistente deployment en CI/CD via Render  
- **Jest (E2E testing)**  
  - Voor automatische end-to-end testen  

### Front-end Web Development

- <LINK_NAAR_NPM_PACKAGE>
  - [Reden van keuze]
- ...

### Web Services

- <LINK_NAAR_NPM_PACKAGE>
  - [Reden van keuze]
- ...

## 🤔 Reflectie

> **Instructie:** Reflecteer eerlijk over je leerproces en het project. Dit helpt zowel jezelf als de docenten om de cursus te verbeteren.

**Wat heb je geleerd?**


Tijdens dit project heb ik geleerd hoe ik een **volledige back-end applicatie** moet opbouwen volgens de **REST-principes**.  
Ik heb geleerd hoe **NestJS** werkt met modules, controllers en services, en hoe deze structuur helpt om een project overzichtelijk en onderhoudbaar te houden.


**Wat vond je goed aan dit project?**

Wat ik goed vond aan dit project is dat het een **realistische use case** heeft.  
Een online afsprakensysteem is iets dat ook in de echte wereld veel voorkomt, waardoor de functionaliteiten logisch en herkenbaar zijn.

**Wat zou je anders doen?**

Als ik opnieuw zou beginnen, zou ik:
- **Vroeger starten met testen**, vooral e2e tests
- Sneller beginnen met **seed data**, zodat ik minder problemen had bij het testen

**Wat waren de grootste uitdagingen?**

- Het correct implementeren van **JWT-authenticatie**
- Het opzetten van de **availability-logica**, waarbij rekening moest worden gehouden met werkuren, afspraken en verlo
- 
**Wat zou je behouden aan de cursus?**

Wat ik zeker zou behouden aan de cursus is:
- De **praktische aanpak**
- Het werken met moderne frameworks zoals **NestJS**
- Het projectgebaseerde leren in plaats van alleen theorie

**Wat zou je toevoegen/aanpassen?**

- Sommige complexere onderwerpen (zoals authenticatie) iets trager en met meer voorbeelden worden behandeld


