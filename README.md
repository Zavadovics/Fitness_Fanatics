# FITNESS FANATICS - Sport Alkalmazás

## _Dokumentáció_

## Alkalmazás bemutatása

-     Az alkalmazás különféle sport tevékenységek nyomon követésében nyújt segítséget.

## Főbb funkciók:

- Regisztráció: Vezetéknév, keresztnév, e-mail és jelszó megadásával.
- Bejelentkezés: E-mail és jelszó megadásával.
- Bejelentkezés utáni főoldal: Az összes tevékenység időrendbeli listázása. A listán szereplő tevékenységeket módosítani vagy törölni lehet.
- Új tevékenység hozzáadása: Itt lehet új tevékenységet hozzáadni az adatbázishoz.
- Saját profil: Megjeleníti az adatbázisban szereplő adatainkat. A "módosítás" gombra kattintva átirányít a profil szerkesztése oldalra.
- Saját profil szerkesztése: Az űrlapba betölti azokat az adatokat amiket korábban már megadtunk. Új adatokat adhatunk hozzá az adatbázishoz.
- Edzéstervek: Az adatbázisban található edzéstervek lekérése.
- A "városok" nevű adatbázis kollekcióhoz a profil szerkesztése oldalon található tartózkodási hely nevű select/dropdown-on keresztül lehet hozzaáadni. Ez egyben az adatbázisban szereplő városok listájának megjelenítéséért is felelős.
- A "fotók" nevű adatbázis kollekció szintén a profil szerkesztése oldalon keresztül manipulálható.

## Oldalak

| Oldalak             | Szerepük                                                                       |
| ------------------- | ------------------------------------------------------------------------------ |
| /                   | Főoldal (ide érkezik a felhasználó a regisztráció és/vagy bejelentkezés előtt) |
| /register           | Új felhasználó regisztrációja                                                  |
| /login              | Felhasználó bejelentkezése                                                     |
| /activities         | Bejelentkezés utáni főoldal (összes tevékenység időrendbeli listázása)         |
| /activities/new     | Új tevékenység hozzáadása                                                      |
| /activities/edit/id | Tevékenység módosítása                                                         |
| /profile            | Saját profil megjelenítése                                                     |
| /profile/edit/id    | Saját profil szerkesztése                                                      |
| /training-plans     | Edzés tervek megjelenítése                                                     |

## API végpontok

| API végpontok          | Szerepük                               |
| ---------------------- | -------------------------------------- |
| POST/register          | Új felhasználó regisztrációja          |
| POST/login             | Felhasználó bejelentkezése             |
| GET/activities         | Összes edzés időrendbeli listázása     |
| POST/activities        | Új edzés hozzáadása az adatbázishoz    |
| PUT/activities/{id}    | Tevékenység módosítása id alapján      |
| DELETE/activities/{id} | Tevékenység törlése id alapján         |
| GET/activities/{id}    | Saját profil lekérése és megjelenítése |
| PUT/users/{id}         | Saját profil módosítása id alapján     |
| DELETE/users/{id}      | Saját profil törlése                   |
| GET/photos/{id}        | Saját fotó lekérése és megjelenítése   |
| PUT/photos/{id}        | Saját fotó módosítása id alapján       |
| DELETE/photo/{id}      | Saját fotó törlése                     |

## Adatbázis gyűjtemények

| Nevük          | Tartalmuk            |
| -------------- | -------------------- |
| users          | felhasználók         |
| activities     | tevékenységek        |
| cities         | Magyarország városai |
| photos         | felhasználók fotói   |
| training plans | edzés tervek         |
