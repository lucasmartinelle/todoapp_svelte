<script>
    import Task from "./task.svelte";

    export let changeWindow;
    export let changeDone;
    export let tasks;
</script>
<div class="container mt-5">
    <div class="d-flex justify-content-end">
        <button 
            type="button" 
            class="btn btn-outline-light"
            on:click={() => changeWindow() }>Créer une tâche</button>
    </div>
</div>
{#each tasks as task, index}
    <Task {task} {index} {changeDone} />
{/each}