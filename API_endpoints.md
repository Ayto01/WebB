## URL structuur

**Base URL:** alle endpoints gebruiken de prefix `/api`.



---

## Health

| Methode | Endpoint | Beschrijving |
|---|---|---|
| **GET** | `/api/health/ping` | Controleert of de server actief is |

---

## Sessions (auth)

| Methode | Endpoint | Beschrijving |
|---|---|---|
| **POST** | `/api/sessions` | Inloggen en een JWT token ontvangen |

---

## Users (klanten) — CRUD

| Methode | Endpoint | Beschrijving |
|---|---|---|
| **GET** | `/api/users` | Haalt alle klanten op |
| **GET** | `/api/users/:id` | Haalt één klant op via ID |
| **POST** | `/api/users` | Maakt een nieuwe klant aan |
| **PUT** | `/api/users/:id` | Werkt een bestaande klant volledig bij |
| **DELETE** | `/api/users/:id` | Verwijdert een klant |

---

## Services (diensten) — CRUD

| Methode | Endpoint | Beschrijving |
|---|---|---|
| **GET** | `/api/services` | Haalt alle diensten op |
| **GET** | `/api/services/:id` | Haalt één dienst op via ID |
| **POST** | `/api/services` | Maakt een nieuwe dienst aan |
| **PUT** | `/api/services/:id` | Werkt een dienst volledig bij |
| **DELETE** | `/api/services/:id` | Verwijdert een dienst |

---

## Appointments (afspraken) — CRUD

| Methode | Endpoint | Beschrijving |
|---|---|---|
| **GET** | `/api/appointments` | Haalt alle afspraken op |
| **GET** | `/api/appointments/:id` | Haalt één afspraak op via ID |
| **POST** | `/api/appointments` | Maakt een nieuwe afspraak aan |
| **PUT** | `/api/appointments/:id` | Werkt een afspraak volledig bij *(in code is dit PUT)* |
| **DELETE** | `/api/appointments/:id` | Verwijdert een afspraak |

---

## Availability (vrije slots)

| Methode | Endpoint | Beschrijving |
|---|---|---|
| **GET** | `/api/availability?date=YYYY-MM-DD&service_id=1` | Geeft beschikbare tijdsloten terug voor een datum en dienst |

**Queryparameters**
- `date` *(verplicht)*: `YYYY-MM-DD`
- `service_id` *(verplicht)*: integer (id van de dienst)

---

## Work-hours (werkuren) — CRUD

| Methode | Endpoint | Beschrijving |
|---|---|---|
| **GET** | `/api/work-hours` | Haalt alle werkuren op |
| **GET** | `/api/work-hours/:id` | Haalt één werkuren-record op via ID |
| **POST** | `/api/work-hours` | Maakt een nieuw werkuren-record aan |
| **PUT** | `/api/work-hours/:id` | Werkt werkuren volledig bij |
| **DELETE** | `/api/work-hours/:id` | Verwijdert werkuren |

---

## Time-off (verlof) — CRUD

| Methode | Endpoint | Beschrijving |
|---|---|---|
| **GET** | `/api/time-off` | Haalt alle verlofperiodes op |
| **GET** | `/api/time-off/:id` | Haalt één verlofperiode op via ID |
| **POST** | `/api/time-off` | Maakt een nieuwe verlofperiode aan |
| **PUT** | `/api/time-off/:id` | Werkt een verlofperiode volledig bij |
| **DELETE** | `/api/time-off/:id` | Verwijdert een verlofperiode |

---

## Transactions — CRUD

| Methode | Endpoint | Beschrijving |
|---|---|---|
| **GET** | `/api/transactions` | Haalt alle transacties op (optioneel met query voor paginatie/filtering) |
| **GET** | `/api/transactions/:id` | Haalt één transactie op via ID |
| **POST** | `/api/transactions` | Maakt een nieuwe transactie aan |
| **PUT** | `/api/transactions/:id` | Werkt een transactie volledig bij |
| **DELETE** | `/api/transactions/:id` | Verwijdert een transactie |

---

## Conventies & statuscodes

**Statuscodes (algemeen)**
- `200 OK` – succesvolle aanvraag
- `201 Created` – nieuwe resource aangemaakt
- `204 No Content` – succesvolle verwijdering (kan ook `200` met message zijn)
- `400 Bad Request` – ongeldige input
- `404 Not Found` – resource bestaat niet
- `409 Conflict` – conflict (bv. dubbele/overlappende afspraak)

**Conventies**
- Endpoint-namen zijn zelfstandige naamwoorden (resources), geen werkwoorden.
- Filtering/zoekcriteria gebeuren via queryparameters (bv. availability).
- Consistente URL-structuur met `/api` als prefix.
