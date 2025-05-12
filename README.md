# Glorp Analytics
A projekt célja igazából egy olyan weboldal amin keresztül egy átlag felhasználó az áltála megtekinteni való itemet (ez esetben videójátékbeli termékekről beszélünk amelyek valós értékkel rendelkeznek) tudja megtekinteni, és különböző feltételek alapján jut hozzá információhoz.

# Fontosabb célkitűzések
- Könnyű bővíthetőség (scalability)
-	Valós adatokkal való munka
-	Letisztult és egyszerű design


Miért **React?**
- Rengeteg könytár és support
- Scalable
- Beginner Friendly

Miért **Vite**
- HMR (Hot module replacement)
- Igazából csak megláttam valahol és megtetszett

Miért **react-router-dom** és **recharts**

- **Recharts** azért mert megtalálható volt ebben is és elég könnyen alakithatóak a grafikonok, **react-router-dom** meg a lapok közötti mozgáshoz illetve hogy rendesen deployolható legyen.



## HOW TO INSTALL
Needed: git and npm
> Download links
[Git](https://git-scm.com/)
[Npm](https://nodejs.org/)
> 
Find a file where u want to clone the repository to and run these commands in the terminal:
  1. git clone https://github.com/idkbro123f/website.git
  2. cd website
  3. npm install
  4. npm run dev
If everything goes right it should work

If the website is running you can access it here [Website](https://idkbro123f.github.io/website/)

# Rendszer fő részei:
-	App: [/src](src) mappában a [/components](src/components) mappában az általunk külön elkészített renderelt weblapok illetve a main.jsx.
-	Adatlekérés: Egyszerű fetch formában, a kapott választ formázva, illetve benne iterálva kapjuk az általunk látható grafikonokat ([Charts](src/components/Charts.jsx), [Dashboard](src/components/DataDashboard.jsx))
-	Grafikonok: Címmel ellátva lehet látni a mi szükségleteinknek megfelelően kiválasztott termék adatait, vonal illetve tömbgrafikon.
- About: Rövid leírást ad a weblap szerepéről, illetve illusztrációval szemléltet.
- [package.json](/package.json): Ebben találjuk a különböző dependenciákat amiket használ a program a futáshoz.
