/**
 * @author Luuxis
 * Luuxis License v1.0 (voir fichier LICENSE pour les détails en FR/EN)
 */

const { ipcRenderer, shell } = require('electron');
const pkg = require('../package.json');
const os = require('os');
import { config, database } from './utils.js';
const nodeFetch = require("node-fetch");


class Splash {
    constructor() {
        this.splash = document.querySelector(".splash");
        this.splashMessage = document.querySelector(".splash-message");
        this.splashAuthor = document.querySelector(".splash-author");
        this.message = document.querySelector(".message");
        this.progress = document.querySelector(".progress");
        document.addEventListener('DOMContentLoaded', async () => {
            let databaseLauncher = new database();
            let configClient = await databaseLauncher.readData('configClient');
            let theme = configClient?.launcher_config?.theme || "auto"
            let isDarkTheme = await ipcRenderer.invoke('is-dark-theme', theme).then(res => res)
            document.body.className = isDarkTheme ? 'dark global' : 'light global';
            if (process.platform == 'win32') ipcRenderer.send('update-window-progress-load')
            this.startAnimation()
        });
    }

    async startAnimation() {
        let splashes = [
            [
         { "message": "Le mot dinosaure signifie 'terrible lézard' en grec.", "author": "Oaris" },
         { "message": "Le plus grand dinosaure connu est l’Argentinosaurus.", "author": "Proximity" },
         { "message": "Le plus petit dinosaure mesurait à peine 50 cm.", "author": "Oaris" },
         { "message": "Certains dinosaures avaient des plumes comme les oiseaux.", "author": "Proximity" },
         { "message": "Le T-Rex avait une mâchoire capable de broyer des os.", "author": "Oaris" },
         { "message": "Les dinosaures ont vécu plus de 160 millions d’années.", "author": "Proximity" },
         { "message": "Le Triceratops possédait trois grandes cornes.", "author": "Oaris" },
         { "message": "Le Brachiosaure pouvait atteindre 13 mètres de haut.", "author": "Proximity" },
         { "message": "Le Vélociraptor était beaucoup plus petit que dans les films.", "author": "Oaris" },
         { "message": "Les dinosaures ne vivaient pas tous en même temps.", "author": "Proximity" },
         { "message": "Certains dinosaures avalaient des pierres pour digérer.", "author": "Oaris" },
         { "message": "Le Stegosaurus avait un cerveau de la taille d’une noix.", "author": "Proximity" },
         { "message": "Les fossiles de dinosaures sont découverts sur tous les continents.", "author": "Oaris" },
         { "message": "Le Parasaurolophus avait une crête creuse servant probablement à faire du son.", "author": "Proximity" },
         { "message": "Le Spinosaurus est considéré comme le plus grand carnivore terrestre.", "author": "Oaris" },
         { "message": "Les oiseaux sont des descendants directs des dinosaures.", "author": "Proximity" },
         { "message": "Les dinosaures ont disparu il y a environ 66 millions d’années.", "author": "Oaris" },
         { "message": "Un astéroïde est la principale cause de leur extinction.", "author": "Proximity" },
         { "message": "Le Diplodocus pouvait mesurer plus de 25 mètres de long.", "author": "Oaris" },
         { "message": "Le Carnotaurus avait des bras encore plus petits que ceux du T-Rex.", "author": "Proximity" },
         { "message": "Le Microraptor avait quatre ailes.", "author": "Oaris" },
         { "message": "Le Pachycephalosaurus avait un crâne en dôme utilisé pour les combats.", "author": "Proximity" },
         { "message": "Les dinosaures vivaient à l’ère mésozoïque.", "author": "Oaris" },
         { "message": "Le Giganotosaurus rivalisait en taille avec le T-Rex.", "author": "Proximity" },
         { "message": "Le Coelophysis est l’un des premiers dinosaures connus.", "author": "Oaris" },
         { "message": "Le Corythosaurus possédait une crête en forme de casque.", "author": "Proximity" },
         { "message": "Certains dinosaures pouvaient courir à plus de 40 km/h.", "author": "Oaris" },
         { "message": "Le Mosasaure n’était pas un dinosaure, mais un reptile marin.", "author": "Proximity" },
         { "message": "Les dinosaures herbivores vivaient souvent en troupeaux.", "author": "Oaris" },
         { "message": "Le Ankylosaurus était protégé par une véritable armure osseuse.", "author": "Proximity" },
         { "message": "Le T-Rex avait une vision meilleure que celle des aigles.", "author": "Oaris" },
         { "message": "Les empreintes fossilisées s’appellent des ichnofossiles.", "author": "Proximity" },
         { "message": "Le Troodon avait un des plus grands cerveaux proportionnels chez les dinosaures.", "author": "Oaris" },
         { "message": "Les dinosaures vivaient aussi bien dans les déserts que dans les forêts.", "author": "Proximity" },
         { "message": "Le Styracosaurus avait de longues cornes sur sa collerette osseuse.", "author": "Oaris" },
         { "message": "Les premiers dinosaures sont apparus il y a 230 millions d’années.", "author": "Proximity" },
         { "message": "Certains dinosaures avaient des becs comme les oiseaux.", "author": "Oaris" },
         { "message": "Le Suchomimus avait un museau allongé semblable à celui d’un crocodile.", "author": "Proximity" },
         { "message": "Les fossiles de dinosaures ont permis de mieux comprendre l’évolution.", "author": "Oaris" },
         { "message": "Le Gallimimus ressemblait à une autruche géante.", "author": "Proximity" },
         { "message": "Le Megalosaurus fut le premier dinosaure officiellement nommé.", "author": "Oaris" },
         { "message": "Certains dinosaures avaient des crêtes colorées pour séduire.", "author": "Proximity" },
         { "message": "Le Utahraptor était bien plus grand que le Vélociraptor.", "author": "Oaris" },
         { "message": "Le Camarasaurus était un sauropode très répandu.", "author": "Proximity" },
         { "message": "Les dinosaures ont évolué en une multitude de formes et tailles.", "author": "Oaris" },
         { "message": "Le Titanosaurus fait partie des plus grands herbivores.", "author": "Proximity" },
         { "message": "Certains dinosaures pouvaient vivre plus de 70 ans.", "author": "Oaris" },
         { "message": "Le Allosaurus était le prédateur dominant avant le T-Rex.", "author": "Proximity" },
         { "message": "Les fossiles sont souvent découverts dans des couches de sédiments.", "author": "Oaris" },
         { "message": "Le Iguanodon avait des pouces en forme de pics.", "author": "Proximity" }
]

        ];
        let splash = splashes[Math.floor(Math.random() * splashes.length)];
        this.splashMessage.textContent = splash.message;
        this.splashAuthor.children[0].textContent = "@" + splash.author;
        await sleep(100);
        document.querySelector("#splash").style.display = "block";
        await sleep(500);
        this.splash.classList.add("opacity");
        await sleep(500);
        this.splash.classList.add("translate");
        this.splashMessage.classList.add("opacity");
        this.splashAuthor.classList.add("opacity");
        this.message.classList.add("opacity");
        await sleep(1000);
        this.checkUpdate();
    }

    async checkUpdate() {
        this.setStatus(`Recherche de mise à jour...`);

        ipcRenderer.invoke('update-app').then().catch(err => {
            return this.shutdown(`erreur lors de la recherche de mise à jour :<br>${err.message}`);
        });

        ipcRenderer.on('updateAvailable', () => {
            this.setStatus(`Mise à jour disponible !`);
            if (os.platform() == 'win32') {
                this.toggleProgress();
                ipcRenderer.send('start-update');
            }
            else return this.dowloadUpdate();
        })

        ipcRenderer.on('error', (event, err) => {
            if (err) return this.shutdown(`${err.message}`);
        })

        ipcRenderer.on('download-progress', (event, progress) => {
            ipcRenderer.send('update-window-progress', { progress: progress.transferred, size: progress.total })
            this.setProgress(progress.transferred, progress.total);
        })

        ipcRenderer.on('update-not-available', () => {
            console.error("Mise à jour non disponible");
            this.maintenanceCheck();
        })
    }

    getLatestReleaseForOS(os, preferredFormat, asset) {
        return asset.filter(asset => {
            const name = asset.name.toLowerCase();
            const isOSMatch = name.includes(os);
            const isFormatMatch = name.endsWith(preferredFormat);
            return isOSMatch && isFormatMatch;
        }).sort((a, b) => new Date(b.created_at) - new Date(a.created_at))[0];
    }

    async dowloadUpdate() {
        const repoURL = pkg.repository.url.replace("git+", "").replace(".git", "").replace("https://github.com/", "").split("/");
        const githubAPI = await nodeFetch('https://api.github.com').then(res => res.json()).catch(err => err);

        const githubAPIRepoURL = githubAPI.repository_url.replace("{owner}", repoURL[0]).replace("{repo}", repoURL[1]);
        const githubAPIRepo = await nodeFetch(githubAPIRepoURL).then(res => res.json()).catch(err => err);

        const releases_url = await nodeFetch(githubAPIRepo.releases_url.replace("{/id}", '')).then(res => res.json()).catch(err => err);
        const latestRelease = releases_url[0].assets;
        let latest;

        if (os.platform() == 'darwin') latest = this.getLatestReleaseForOS('mac', '.dmg', latestRelease);
        else if (os == 'linux') latest = this.getLatestReleaseForOS('linux', '.appimage', latestRelease);


        this.setStatus(`Mise à jour disponible !<br><div class="download-update">Télécharger</div>`);
        document.querySelector(".download-update").addEventListener("click", () => {
            shell.openExternal(latest.browser_download_url);
            return this.shutdown("Téléchargement en cours...");
        });
    }


    async maintenanceCheck() {
        config.GetConfig().then(res => {
            if (res.maintenance) return this.shutdown(res.maintenance_message);
            this.startLauncher();
        }).catch(e => {
            console.error(e);
            return this.shutdown("Aucune connexion internet détectée,<br>veuillez réessayer ultérieurement.");
        })
    }

    startLauncher() {
        this.setStatus(`Démarrage du launcher`);
        ipcRenderer.send('main-window-open');
        ipcRenderer.send('update-window-close');
    }

    shutdown(text) {
        this.setStatus(`${text}<br>Arrêt dans 5s`);
        let i = 4;
        setInterval(() => {
            this.setStatus(`${text}<br>Arrêt dans ${i--}s`);
            if (i < 0) ipcRenderer.send('update-window-close');
        }, 1000);
    }

    setStatus(text) {
        this.message.innerHTML = text;
    }

    toggleProgress() {
        if (this.progress.classList.toggle("show")) this.setProgress(0, 1);
    }

    setProgress(value, max) {
        this.progress.value = value;
        this.progress.max = max;
    }
}

function sleep(ms) {
    return new Promise(r => setTimeout(r, ms));
}

document.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.shiftKey && e.keyCode == 73 || e.keyCode == 123) {
        ipcRenderer.send("update-window-dev-tools");
    }
})
new Splash();