var posActual=0;

//CARRUCEL
function carousel(){
    var imagenes=document.getElementsByClassName("imagenes");  
    for(let i=0;i<imagenes.length;i++) {
        imagenes[i].style.display="none";  
    }
    posActual++;
    if (posActual>imagenes.length){
        posActual=1;
    }    
    imagenes[posActual-1].style.display="block";  
    setTimeout(carousel,2000); 
}

// FUNCION PARA REGISTRAR CRONOLOGICAMENTE UN CURSO
function registrarCurso(e){
    e.preventDefault();
    let campoTituloCurso=document.getElementById('tituloCurso');
    let campoFechaCurso=document.getElementById('fechaCurso');
    let campoAficheCurso=document.getElementById('aficheCurso');
    let datoTituloCurso=campoTituloCurso.value;
    let datoFechaCurso=campoFechaCurso.value;
    let datoAficheCurso=campoAficheCurso.files[0];
    let contenedorCursos=document.getElementById('cursos');
    let nuevoCurso=document.createElement('div');
    nuevoCurso.className='w3-col s12 m6 l4 curso';
    let tituloCurso=document.createElement('h3');
    tituloCurso.textContent=datoTituloCurso.toUpperCase();
    let fechaCurso=document.createElement('h4');
    let objetoFecha=new Date(datoFechaCurso);
    fechaCurso.textContent=objetoFecha.toLocaleDateString('es-BO',{day:'2-digit',month:'2-digit',year:'numeric'});
    let aficheCurso=document.createElement('img');
    aficheCurso.alt='Banner-Curso';
    let reader=new FileReader();
    reader.onload=()=>{
        aficheCurso.src=reader.result;
    };
    reader.readAsDataURL(datoAficheCurso);
    nuevoCurso.appendChild(tituloCurso);
    nuevoCurso.appendChild(fechaCurso);
    nuevoCurso.appendChild(aficheCurso);
    let tiempoNuevoCurso=objetoFecha.getTime();
    nuevoCurso.dataset.timestamp=String(tiempoNuevoCurso);
    let cursosExistentes=Array.from(contenedorCursos.querySelectorAll('.curso'));
    let obtenerTimestampDeCurso=function(curso){
        let etiquetaFecha=curso.querySelector('h4');
        let datosFecha=etiquetaFecha.textContent.trim().split('/');
        let dia=parseInt(datosFecha[0],10);
        let mes=parseInt(datosFecha[1],10);
        let anio=parseInt(datosFecha[2],10);
        let fechaObtenida=new Date(anio,(mes-1),dia);
        return fechaObtenida.getTime();
    };
    let lugarInsertarCurso=null;
    for(let i=0;i<cursosExistentes.length;i++){
        let cursoActual=cursosExistentes[i];
        let timestampActual=obtenerTimestampDeCurso(cursoActual);
        if(timestampActual<tiempoNuevoCurso){
            lugarInsertarCurso=cursoActual;
            break;
        }
    }
    if(lugarInsertarCurso){
        contenedorCursos.insertBefore(nuevoCurso,lugarInsertarCurso);
    }else{
        contenedorCursos.appendChild(nuevoCurso);
    }
    campoTituloCurso.value="";
    campoFechaCurso.value="";
    campoAficheCurso.value="";
}



// FUNCION PARA REGISTRAR CRONOLOGICAMENTE UNA PUBLICACION
function registrarPublicacion(e){
    e.preventDefault();
    let campoAreaPublicacion=document.querySelector('.seccion4 select');
    let campoTituloPublicacion=document.querySelector('.seccion4 input[type="text"]');
    let campoDescripcionPublicacion=document.querySelector('.seccion4 textarea');
    let campoArchivoPublicacion=document.querySelector('.seccion4 input[type="file"]');
    let datoAreaPublicacion=campoAreaPublicacion.value.trim();
    let datoTituloPublicacion=campoTituloPublicacion.value;
    let datoDescripcionPublicacion=campoDescripcionPublicacion.value;
    let datoArchivoPublicacion=campoArchivoPublicacion.files[0];
    let contenedorPublicaciones=document.querySelector('.seccion4');
    let nuevaPublicacion=document.createElement('div');
    nuevaPublicacion.className='w3-card tarjeta';
    nuevaPublicacion.id=datoAreaPublicacion;
    let tituloPublicacion=document.createElement('h3');
    tituloPublicacion.textContent=datoTituloPublicacion;
    let separador=document.createElement('hr');
    let contenedorInterno=document.createElement('div');
    let enlacePDF=document.createElement('a');
    enlacePDF.href=URL.createObjectURL(datoArchivoPublicacion);
    enlacePDF.download=datoArchivoPublicacion.name;
    let imagenPDF=document.createElement('img');
    imagenPDF.src='Imagenes/simboloPDF.png';
    imagenPDF.alt='PDF';
    let parrafoDescripcion=document.createElement('p');
    parrafoDescripcion.textContent=datoDescripcionPublicacion;
    enlacePDF.appendChild(imagenPDF);
    contenedorInterno.appendChild(enlacePDF);
    contenedorInterno.appendChild(parrafoDescripcion);
    nuevaPublicacion.appendChild(tituloPublicacion);
    nuevaPublicacion.appendChild(separador);
    nuevaPublicacion.appendChild(contenedorInterno);
    contenedorPublicaciones.appendChild(nuevaPublicacion);
    campoAreaPublicacion.value="";
    campoTituloPublicacion.value="";
    campoDescripcionPublicacion.value="";
    campoArchivoPublicacion.value="";
}


// FILTRAR PUBLICACIONES DE MATEMATICAS
function filtrarPublicacionesMatematicas(){
    let publicaciones=document.querySelectorAll('.tarjeta');
    publicaciones.forEach(function(publicacion){
        if(publicacion.id==='Matematica'){
            publicacion.style.display='block';
        }else{
            publicacion.style.display='none';
        }
    });
}

// FILTRAR PUBLICACIONES DE INFORMATICA
function filtrarPublicacionesInformatica(){
    let publicaciones=document.querySelectorAll('.tarjeta');
    publicaciones.forEach(function(publicacion){
        if(publicacion.id==='Informatica'){
            publicacion.style.display='block';
        }
        else{
            publicacion.style.display='none';
        }
    });
}

//ASOCIAR FUNCIONES A EVENTO DEL LOS BOTONES DE FILTRO
document.querySelector('.filtro1').addEventListener('click',filtrarPublicacionesMatematicas);
document.querySelector('.filtro2').addEventListener('click',filtrarPublicacionesInformatica);

// REGISTRAR AFICHE ICPC
function registrarAfiche(e){
    e.preventDefault();
    let campoArchivoAfiche=document.querySelector('.seccion6 form input[type="file"]');
    let datoArchivoAfiche=campoArchivoAfiche.files[0];
    let contenedorAfiches=document.querySelector('.afiches');
    let nuevoAfiche=document.createElement('div');
    nuevoAfiche.className='w3-col s12 m6 l4 w3-row-padding';
    let imagenAfiche=document.createElement('img');
    let reader=new FileReader();
    reader.onload=function(){
        imagenAfiche.src=reader.result;
    };
    reader.readAsDataURL(datoArchivoAfiche);
    nuevoAfiche.appendChild(imagenAfiche);
    contenedorAfiches.appendChild(nuevoAfiche);
    campoArchivoAfiche.value="";
}


// REGISTRAR FOTO/VIDEO ICPC
function registrarFotoVideo(e){
    e.preventDefault();
    let campoArchivoFotoVideo=document.querySelectorAll('.seccion6 form input[type="file"]')[1];
    let datoArchivoFotoVideo=campoArchivoFotoVideo.files[0];
    let contenedorFotoVideo=document.querySelector('.fotos_videos');
    let nuevoElemento=document.createElement('div');
    nuevoElemento.className='w3-col s12 m6 l4 w3-row-padding';
    let tipoArchivo=null;
    if(datoArchivoFotoVideo.type.startsWith('video')){
        tipoArchivo='video';
    } else {
        tipoArchivo='img';
    }
    if(tipoArchivo==='video'){
        let video=document.createElement('video');
        video.controls=true;
        let sourceVideo=document.createElement('source');
        sourceVideo.src=URL.createObjectURL(datoArchivoFotoVideo);
        sourceVideo.type=datoArchivoFotoVideo.type;
        video.appendChild(sourceVideo);
        nuevoElemento.appendChild(video);
    }else{
        let reader=new FileReader();
        let foto=document.createElement('img');
        reader.onload=function(){
            foto.src=reader.result;
        };
        reader.readAsDataURL(datoArchivoFotoVideo);
        nuevoElemento.appendChild(foto);
    }
    contenedorFotoVideo.appendChild(nuevoElemento);
    campoArchivoFotoVideo.value="";
}

// MENU
// ELEMENTOS
let menuPersiana=document.getElementById('menu');
let botonHamburguesa=document.getElementById('botonHamburguesa');
let botonSubmenu=document.querySelector('.botonSubmenu');
let submenuAcerca=document.getElementById('submenuAcerca');

// ABRIR / CERRAR MENÚ MÓVIL
if(botonHamburguesa && menuPersiana){
  botonHamburguesa.addEventListener('click',function(){
    let estaAbierto=menuPersiana.classList.toggle('desplegado');
    if(estaAbierto){
      botonHamburguesa.setAttribute('aria-expanded','true');
    }else{
      botonHamburguesa.setAttribute('aria-expanded','false');
    }
  });
}

// ABRIR / CERRAR SUBMENÚ MÓVIL
if(botonSubmenu&&submenuAcerca){
  botonSubmenu.addEventListener('click',function(){
    let abierto=submenuAcerca.classList.toggle('desplegado');
    if(abierto){
      botonSubmenu.setAttribute('aria-expanded','true');
    }else{
      botonSubmenu.setAttribute('aria-expanded','false');
    }
  });
}

//CERRAR MENÚ AL ELEGIR UNA OPCIÓN EN MÓVIL
if(menuPersiana){
  menuPersiana.addEventListener('click',function(e){
    let enlace=e.target.closest('a[href^="#"]');
    if(!enlace){ return; }
    let esEscritorio=window.matchMedia('(min-width: 992px)').matches;
    if(!esEscritorio){
      menuPersiana.classList.remove('desplegado');
      if(botonHamburguesa){ botonHamburguesa.setAttribute('aria-expanded','false'); }
      if(submenuAcerca){ submenuAcerca.classList.remove('desplegado'); }
    }
  });
}

// SCROLL SUAVE CON OFFSET (HEADER FIJO + MENÚ)
function obtenerOffsetSuperior(){
  let estilos=getComputedStyle(document.documentElement);
  let extra=parseFloat(estilos.getPropertyValue('--extra-offset'))||0;
  let header=document.querySelector('header');
  let altoHeader=0;
  if(header){ 
    altoHeader=header.getBoundingClientRect().height; 
  }
  let esEscritorio=window.matchMedia('(min-width: 992px)').matches;
  let altoMenu=0;
  if(esEscritorio&&menuPersiana){
    altoMenu=menuPersiana.getBoundingClientRect().height;
  }
  return altoHeader+altoMenu+extra;
}

function desplazarASuave(idObjetivo){
  let el=document.querySelector(idObjetivo);
  if(!el){ 
    return; 
  }
  let y=el.getBoundingClientRect().top+window.scrollY-obtenerOffsetSuperior();
  window.scrollTo({top:y,behavior:'smooth'});
}

// INTERCEPTAR ENLACES INTERNOS 
document.addEventListener('click',function(e){
  let enlace=e.target.closest('a[href^="#"]');
  if(!enlace){ return; }
  let hash=enlace.getAttribute('href');
  if(hash.length>1){
    e.preventDefault();
    desplazarASuave(hash);
    document.querySelectorAll('.menu a').forEach(function(a){a.classList.remove('active'); });
    enlace.classList.add('active');
    history.replaceState(null,'',hash);
  }
});

// CORREGIR SCROLL 
window.addEventListener('load',function(){
  if(location.hash){
    setTimeout(function(){desplazarASuave(location.hash);},50);
  }
});


// ACTIVAR FUNCIONES AL CARGARSE EL HTML
window.onload=function(){
    filtrarPublicacionesMatematicas();
    carousel();
};


