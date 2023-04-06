<script type="text/javascript">
    export let task;
    export let index;
    export let changeDone;

    let card_type;
    let is_done;
    $: is_done = (task.done) ? true : false;
    
    switch(task.priorite){
        case '0':
            card_type = "task-card-prio0";
            break;
        case '1':
            card_type = "task-card-prio1";
            break;
        case '2':
            card_type = "task-card-prio2";
            break;
        default:
            card_type = "task-card-prio3";
            break;
    }
</script>

<div class="container shadow-lg p-4 mt-4 task-card {card_type}">
    <div class="d-flex gap-3">
        <div>
            <input 
                type="checkbox" 
                name="done" 
                id="done" 
                class="form-check-input" 
                checked="{is_done}"
                on:change={() => changeDone(index)}>
            <a 
                type="button" 
                class="btn btn-outline-light d-flex justify-content-center mt-2 p-1"
                href="/edit/{index}">
                <span class="material-symbols-outlined">
                    edit
                </span>
            </a>
            <button type="button" class="btn btn-outline-light d-flex justify-content-center mt-2 p-1">
                <span class="material-symbols-outlined">
                    delete
                </span>
            </button>
        </div>
        <div class="container text-start">
            <div class="d-flex justify-content-between">
                <h5 class="fw-bold">{#if is_done}<del>{task.titre}</del>{:else}{task.titre}{/if}</h5>
                <p class="fw-bold">{task.dateEcheance}</p>
            </div>
            <p class="text-justify">{task.description}</p>
        </div>
    </div>
</div>

<style>
    .task-card-prio3 {
        background-color: #111213 !important;
        color: #ffffff;
    }
    .task-card-prio2 {
        background-color: #e2c805 !important;
        color: #000000;
    }
    .task-card-prio1 {
        background-color: #d98900 !important;
        color: #000000;
    }
    .task-card-prio0 {
        background-color: #a00101 !important;
        color: #ffffff;
    }
</style>
