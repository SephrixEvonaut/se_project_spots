export function setButtonText(
    btn,
    isLoading,
    defaultText = "Save",
    loadingText = "Saving...",
)
{
    if (isLoading){
       btn.textContent = loadingText
        console.log(`Setting text to ${loadingText}`)
    } else {
        btn.textContent = defaultText
    }

}

// export function wait(ms) {
//     return new Promise(resolve => setTimeout(resolve, ms));
// }

  // ^^^in case ppl cant read "saving" TURN HANDLE FUNCS ASYNC... apply await wait(1000);