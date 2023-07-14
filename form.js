const forms = document.querySelectorAll('.sections')
const navBackButton = document.querySelector('.nav-back-button')
const navForwardButton = document.querySelector('.nav-forward-button')
const sideBar = document.querySelectorAll('.side-bar-item-no')
const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const cards = document.querySelectorAll('.cards')
const inputS_2 = document.querySelector(".section-2-input")
const textForYears = document.querySelectorAll(".for-years")
const planS_2 = document.querySelectorAll(".section-2-price")
const planS_3 = document.querySelectorAll(".section-3-price")
const addOns = document.querySelectorAll('.add-ons')
const nameOfPlan = document.querySelector(".package-details")
const priceOfPlan = document.querySelector(".package-price")
const planUl = document.querySelector(".plan-additionals")
const planLi = document.querySelectorAll(".plan-additionals-li")
const finalPrice = document.querySelector(".total-charges")
let currentSection = 0
let totalPrice = 0
let tempPrice = 0
let planType = 'Monthly'

function formControl(val = 0) {
   let i = 0
  forms.forEach(section => {
    if(i!=val){
        section.classList.add('hide')//!hide this section
        sideBarControl(i, false)
    }
    else{
            section.classList.remove('hide');//!shows this section
            sideBarControl(i, true)
        }
    i++
  })
    currentSection = val;
}
function sideBarControl(index, state){
    sideBar[index].setAttribute('aria-checked', state)
}
function isEmailValid(email) {
    return emailFormat.test(email);
}
function exractNumber(value){
    const match = value.match(/\d+/)
    return(parseInt(match[0], 10))
}
formControl()

navBackButton.addEventListener('click', () => {
    if(currentSection!==0){
        formControl(--currentSection)
        if(currentSection===2){
            navForwardButton.innerHTML = "Next"
            const ulElement = document.querySelector(".plan-additionals")
            const liElements = planUl.querySelectorAll(".plan-additionals-li")
            console.log(ulElement)
            liElements.forEach(li => {
                li.remove()
              })
            totalPrice = tempPrice
        }
    }
})

navForwardButton.addEventListener('click', () => {
    if(currentSection!==4){
        console.log(`clicked ${currentSection}`)
        let fieldsFilled = true
        if(currentSection===0){
            console.log(`clicked ${currentSection}`)
            const inputS_1 = document.querySelectorAll(".section-1-inputs")
            const errorTags = document.querySelectorAll(".section-1-form-error")
            if(inputS_1[0].value === ""){
                errorTags[0].textContent = "This field is required"
                fieldsFilled = false
            }
            else{
                errorTags[0].textContent = ""
            }
            if(inputS_1[1].value === "" ){
                    errorTags[1].textContent = "This field is required"
                    fieldsFilled = false
            }else if(!(isEmailValid(inputS_1[1].value.trim()))){
                errorTags[1].textContent = "Incorrect email address"
                fieldsFilled = false
            }
            else{
                errorTags[1].textContent = ""
            }
            if(inputS_1[2].value === ""){
                errorTags[2].textContent = "This field is required"
                fieldsFilled = false
            }
            else{
                errorTags[2].textContent = ""
            }
            //?moving on next form
            if(fieldsFilled){
                formControl(++currentSection)
            }
        }
        //for checking if each field is filled

        else if(currentSection===1){
            console.log(`clicked ${currentSection}`)
            let value = false
            cards.forEach((card)=>{
                if(card.classList.contains("checked")){
                    value = true
                    const name = card.querySelector(".section-2-planName")
                    const price = card.querySelector(".section-2-price")
                    nameOfPlan.innerHTML = `${name.innerHTML} (${planType})`
                    priceOfPlan.innerHTML = price.innerHTML
                    totalPrice = 0
                    totalPrice += exractNumber(priceOfPlan.innerHTML)
                    tempPrice = totalPrice
                }

            })
            if(value){
                formControl(++currentSection)
            }
        }
        else if(currentSection===2){
            console.log(`clicked ${currentSection}`)
            formControl(++currentSection)
            addOns.forEach((addOn) => {
                const input = addOn.querySelector('.section-3-input');
                if (input.checked === true) {
                  const newLi = document.createElement('li')
                  newLi.classList.add('plan-additionals-li')
                  const netDetails = addOn.querySelector(".section-3-input-header")
                  const netPrice = addOn.querySelector(".section-3-price")
                  const p = document.createElement('p')
                  p.classList.add('additionals-name') 
                  const p2 = document.createElement('p')
                  p2.classList.add('additionals-price') 
                  p.innerHTML = netDetails.innerHTML
                  p2.innerHTML = netPrice.innerHTML
                  totalPrice += exractNumber(p2.innerHTML)
                  console.log(totalPrice)
                  newLi.appendChild(p)
                  newLi.appendChild(p2)
                  planUl.appendChild(newLi)
                }
              });
              finalPrice.innerHTML = `$${totalPrice}/${planType}`
            navForwardButton.innerHTML = "Confirm"
        }
        else if(currentSection === 3){
            console.log(`clicked ${currentSection}`)
            const formContainer = document.querySelector(".forms")
            formContainer.classList.add("hide")
            const thanksMessage = document.querySelector(".thanks-msg")
            thanksMessage.classList.remove("hide-msg")
        }
    }
})

cards.forEach(card => {
    card.addEventListener('click', () => {
      cards.forEach(c => {
        if (c !== card) {
          c.classList.remove('checked')
        }
      });
      card.classList.add('checked')
    });
});

inputS_2.addEventListener('change',()=>{
    if(inputS_2.checked){
        textForYears.forEach((p)=>{
            p.classList.remove("hide")
            planS_2[0].innerHTML = '$90/yr'
            planS_2[1].innerHTML = '$120/yr'
            planS_2[2].innerHTML = '$150/yr'
            planS_3[0].innerHTML = '$10/yr'
            planS_3[1].innerHTML = '$20/yr'
            planS_3[2].innerHTML = '$20/yr'
            planType = 'Yearly'
        })
    }
    else{
        textForYears.forEach((p)=>{
            p.classList.add("hide")
            planS_2[0].innerHTML = '$9/mon'
            planS_2[1].innerHTML = '$12/mon'
            planS_2[2].innerHTML = '$15/mon'
            planS_3[0].innerHTML = '$1/mon'
            planS_3[1].innerHTML = '$2/mon'
            planS_3[2].innerHTML = '$2/mon'
            planType = 'Monthly'
        })
    }
})

addOns.forEach((addOn) => {
  const input = addOn.querySelector('.section-3-input');
  addOn.addEventListener('click', () => {
    input.checked = !input.checked; 
  })
})