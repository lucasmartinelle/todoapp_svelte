<script type="text/javascript">
	import { tasksStore, changeDone } from '../stores/tasks.js';

    export let index;
    export let showModalDeleteTask;

    
    let tasks = [];
    tasksStore.subscribe((value) => tasks = value);

    let task;
    let card_type;
    let is_done;
    
    $: {
        task = tasks[index];
        is_done = (task.done) ? true : false;
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
    }

    function nl2br (str, is_xhtml) {
        if (typeof str === 'undefined' || str === null) {
            return '';
        }
        var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
        return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
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
            <button 
                type="button" 
                class="btn btn-outline-light d-flex justify-content-center mt-2 p-1"
                on:click={() => showModalDeleteTask(task) }>
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
            <p class="text-justify">{@html nl2br(task.description)}</p>
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
