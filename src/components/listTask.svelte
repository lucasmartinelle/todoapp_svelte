<script>
    import Task from "./task.svelte";

    export let tasks;
    
    export let changeDone;
</script>
<div class="container mt-5">
    <div class="d-flex justify-content-end">
        <a 
            type="button" 
            class="btn btn-outline-light"
            href="/create">Créer une tâche</a>
    </div>
</div>
{#each tasks as task, index}
    <Task {task} {index} {changeDone} />
{/each}