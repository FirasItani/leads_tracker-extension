//Lead Track Project
let myLead = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))
const tabBtn = document.getElementById("tab-btn")

if (leadsFromLocalStorage) {
  myLead = leadsFromLocalStorage
  render(myLead)
}

tabBtn.addEventListener("click", function () {
  //getting current url
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myLead.push(tabs[0].url)
    localStorage.setItem("myLeads", JSON.stringify(myLead))
    render(myLead)
  })
})

function render(leads) {
  let listItems = ""
  for (let i = 0; i < leads.length; i++) {
    listItems +=
      `<li>
      <a target = '_blank' href = '${leads[i]} '>
        ${leads[i]}
      </a>
    </li>`

  }
  ulEl.innerHTML = listItems
}

deleteBtn.addEventListener("dblclick", function () {
  localStorage.clear()
  myLead = []
  render(myLead)
})

inputBtn.addEventListener("click", function () {
  myLead.push(inputEl.value)
  inputEl.value = ""
  //save to localStorage as string
  localStorage.setItem("myLeads", JSON.stringify(myLead))
  render(myLead)
})




