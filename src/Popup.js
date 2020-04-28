export default function TogglePopup() {
  let box = document.getElementsByClassName('Popup-Box')[0]
  if(box.style.visibility === 'hidden') {
    box.style.visibility = 'visible'
  } else {
    box.style.visibility = 'hidden'
  }
}