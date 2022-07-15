const contact = new Vue({
    el: '#contacto',
    data: {
        indice: -1,
        mostrarCreate: true,
        mostrarEdit: false,
        contactos:[],
        nombre: '',
        telefono: '',
        fecha_nacimiento: '',
        edad: '',
        direccion: '',
        correo: "",
        campo_filtro: "",
        filtro: "",
    },
    methods:{
        created(){
            let datosLS = JSON.parse(localStorage.getItem('contactosLS'));
            if (datosLS === ""){
                this.contactos = [];
            }
            else{
                this.contactos = datosLS;
            }
        },

        agregarContacto() {   
            let noFill = 0;       
            let age = this.calculoEdad(this.fecha_nacimiento);

            if (this.nombre === ""){
                noFill = 1;
            }
            if (this.telefono === ""){
                noFill = 1;
            }
            if (this.fecha_nacimiento === ""){
                noFill = 1;
            }
            if (this.direccion === ""){
                noFill = 1;
            }
            if (this.correo === ""){
                noFill = 1;
            }
            
            if (noFill === 0){
                this.contactos.push({
                    nombre: this.nombre, 
                    telefono: this.telefono,
                    fecha_nacimiento: this.fecha_nacimiento,
                    direccion: this.direccion,
                    edad: age,
                    correo: this.correo,
                });
                this.nombre = "";
                this.telefono = "";
                this.fecha_nacimiento = "",
                this.direccion = "";
                this.correo = "";
                localStorage.setItem('contactosLS', JSON.stringify(this.contactos));
            }
            else{
                noFill = 0;
            }
            
        },

        calculoEdad(fecha_nacimiento){
            let nacimiento = moment(fecha_nacimiento);
            let fecha_actual = moment();
            let edad = 0;
            if (nacimiento < fecha_actual){
                edad = fecha_actual.diff(nacimiento, 'years');
            } 
            else{
                console.error("La fecha de nacimiento no puede ser superior a la fecha actual")
            }
            return edad;
        },

        cargarEditar(index){
            let contacto = this.contactos[index];
            this.nombre = contacto.nombre;
            this.telefono = contacto.telefono;
            this.fecha_nacimiento = contacto.fecha_nacimiento;
            this.direccion = contacto.direccion;
            this.correo = contacto.correo;
            this.mostrarCreate = false;
            this.mostrarEdit = true;
            this.indice = index;

            localStorage.setItem('contactosLS', JSON.stringify(this.contactos));
            let datosLS = JSON.parse(localStorage.getItem('contactosLS'));
            this.contactos = datosLS;
        },

        editarContacto(index){
            let contacto = this.contactos[index];
            let age = this.calculoEdad(this.fecha_nacimiento);

            contacto.nombre = this.nombre; 
            contacto.telefono = this.telefono;
            contacto.fecha_nacimiento = this.fecha_nacimiento;
            contacto.direccion = this.direccion;
            contacto.edad = age;
            contacto.correo = this.correo;

            this.mostrarCreate = true;
            this.mostrarEdit = false;

            this.nombre = "";
            this.telefono = "";
            this.fecha_nacimiento = "",
            this.direccion = "";
            this.correo = "";

            localStorage.setItem('contactosLS', JSON.stringify(this.contactos));
        },

        eliminarContacto(index){
            this.contactos.splice(index, 1);
            localStorage.setItem('contactosLS', JSON.stringify(this.contactos));
        },

        filtros(){
            if (this.campo_filtro === "1"){
                console.log(this.campo_filtro);
                this.contactos = this.contactos.filter(    
                    contacto => {
                        return contacto.nombre === this.filtro;
                    }
                )
            }
            else if (this.campo_filtro === "2"){
                console.log(this.campo_filtro);
                this.contactos = this.contactos.filter(    
                    contacto => {
                        return contacto.telefono === parseInt(this.filtro);
                    }
                )
            }
            else if (this.campo_filtro === "3"){
                console.log(this.campo_filtro);
                this.contactos = this.contactos.filter(    
                    contacto => {
                        return contacto.correo === this.filtro;
                    }
                )
            }
        },

        quitarFiltros(){
            let datosLS = JSON.parse(localStorage.getItem('contactosLS'));
            this.contactos = datosLS;

            this.filtro = "";
            this.campo_filtro = "";
        }
    }
})