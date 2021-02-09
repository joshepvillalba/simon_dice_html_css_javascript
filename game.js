const blue = document.getElementById('blue')
const violet = document.getElementById('violet')
const orange = document.getElementById('orange')
const green = document.getElementById('green')
const btnstart = document.getElementById('btnstart')
const ULTIMO_NIVEL = 10

class Juego {
    constructor() {
        this.inicializar = this.inicializar.bind(this)
        this.inicializar()
        this.generarSecuencia()

        setTimeout(this.siguienteNivel(), 500)

    }
    inicializar() {
        this.elegirColor = this.elegirColor.bind(this)
        this.siguienteNivel = this.siguienteNivel.bind(this)
        this.togglebtnstart()
        this.nivel = 1
        this.colores = {
            blue,
            violet,
            orange,
            green
        }
    }

    togglebtnstart() {
        if (btnstart.classList.contains('hide')) {
            btnstart.classList.remove('hide')
        } else {
            btnstart.classList.add('hide')
        }
    }

    generarSecuencia() {
        this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map(n => Math.floor(Math.random() * 4))
    }

    siguienteNivel() {
        this.subnivel = 0
        this.iluminarSecuencia()
        this.agregarEventosClick()
    }

    transformarNumeroAColor(numero) {

        switch (numero) {

            case 0:
                return 'blue'
            case 1:
                return 'violet'
            case 2:
                return 'orange'
            case 3:
                return 'green'

        }

    }

    transformarColorANumero(color) {

        switch (color) {

            case 'blue':
                return 0
            case 'violet':
                return 1
            case 'orange':
                return 2
            case 'green':
                return 3

        }

    }


    iluminarSecuencia() {

        for (let i = 0; i < this.nivel; i++) {
            let color = this.transformarNumeroAColor(this.secuencia[i])

            setTimeout(() => {
                this.iluminarColor(color)
            }, 1000 * i)


        }
    }

    iluminarColor(color) {

        this.colores[color].classList.add('light')
        setTimeout(() => this.apagarColor(color), 350)

    }

    apagarColor(color) {
        this.colores[color].classList.remove('light')
    }

    agregarEventosClick() {
        this.colores.blue.addEventListener('click', this.elegirColor)
        this.colores.green.addEventListener('click', this.elegirColor)
        this.colores.violet.addEventListener('click', this.elegirColor)
        this.colores.orange.addEventListener('click', this.elegirColor)
    }

    eliminarEventosClick() {
         this.colores.blue.removeEventListener('click', this.elegirColor)
         this.colores.green.removeEventListener('click', this.elegirColor)
         this.colores.violet.removeEventListener('click', this.elegirColor)
         this.colores.orange.removeEventListener('click', this.elegirColor)
    }

    elegirColor(ev) {
        const nombreColor = ev.target.dataset.color
        const numeroColor = this.transformarColorANumero(nombreColor)

        this.iluminarColor(nombreColor)
        if (numeroColor === this.secuencia[this.subnivel]) {

            this.subnivel++
            if (this.subnivel == this.nivel) {
                this.nivel++
                this.eliminarEventosClick()
                if (this.nivel == (ULTIMO_NIVEL + 1)) {
                    this.ganoElJuego()
                } else {
                    setTimeout(this.siguienteNivel, 1500)
                }
            }

        } else {
            this.perdioElJuego()
        }
    }

    ganoElJuego() {
        swal('Felicitaciones', 'Ganaste el JUEGO perro', 'success')
            .then(this.inicializar)
    }

    perdioElJuego() {
        swal('Lo siento', 'perdiste', 'error')
            .then(() => {
                this.eliminarEventosClick()
                this.inicializar()
            })
    }

}
function empezarJuego() {
    window.juego = new Juego()
}