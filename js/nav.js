document.addEventListener("DOMContentLoaded", function () {

    // activate sidebar nav
    // load sidenav
    const elems = document.querySelectorAll(".sidenav");
    M.Sidenav.init(elems);
    loadNav();

    function loadNav(){
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4){

                if (this.status != 200)return;

                // muat daftar tautan menu 
                document.querySelectorAll(".topnav, .sidenav").forEach(function(elm) {
                    elm.innerHTML = xhttp.responseText;
                })

                // daftarkan event listener untuk setiap tautan menu
                document.querySelectorAll(".sidenav a, .topnav a").forEach(function(elm){

                    elm.addEventListener("click", event =>{
                        // tutup sidenav
                        let sidenav = document.querySelector(".sidenav");
                        M.Sidenav.getInstance(sidenav).close();

                        // muat konten halaman yang dipanggil
                        page = event.target.getAttribute("href").substr(1);
                        loadPage(page);

                    })
                })

            }
        };
        xhttp.open("GET", "nav.html", true);
        xhttp.send();
    }



    let page = window.location.hash.substr(1);
    if (page === "") page = "home"
    loadPage();
    
    function loadPage(){
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4){
                let content = document.querySelector('#body-content');

                if (page === "home") {
                    getAllStandings();
                } else if (page === "saved") {
                    getSavedTeams();
                }

                if (this.status === 200){
                    content.innerHTML = xhttp.responseText;
                }else if(this.status === 404){
                    content.innerHTML = "<p>Halaman tidak ditemukan.</p>";
                }else{
                    content.innerHTML = "<p>Ups... halaman tidak dapat diakses.</p>";
                }
            }
        }
        xhttp.open("GET", `pages/${page}.html`, true);
        xhttp.send();
        
    }



})