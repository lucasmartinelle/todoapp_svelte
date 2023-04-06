<script>
    export let task;
    export let index;
    export let editTask;

    let titre = task.titre;
    let description = task.description;
    let dateEcheance = task.dateEcheance;
    let priorite = task.priorite;
</script>
<div class="container mt-5">
    <div class="d-flex justify-content-end">
        <a 
            type="button" 
            class="btn btn-outline-light"
            href="/"
            >Voir les tâches</a>
    </div>
</div>
<div class="container p-4">
    <div class="row">
        <div class="col-12 mb-4">
            <div class="form-group text-start">
                <label for="titre" class="text-white fw-bold">Titre de la tâche</label>
                <input 
                    type="text" 
                    name="titre" 
                    id="titre" 
                    class="form-control bg-transparent text-white"
                    value={titre}
                    on:change={(event) => titre = event.target.value}>
            </div>
        </div>
        <div class="col-md-6 mb-4">
            <div class="form-group text-start">
                <label for="dateEcheance" class="text-white fw-bold">Date d'échéance</label>
                <input 
                    type="date" 
                    name="dateEcheance" 
                    id="dateEcheance" 
                    class="form-control bg-transparent text-white"
                    value={dateEcheance}
                    on:change={(event) => dateEcheance = event.target.value}>
            </div>
        </div>
        <div class="col-md-6 mb-4">
            <div class="form-group text-start">
                <label for="priorite" class="text-white fw-bold">Priorité</label>
                <select 
                    name="priorite" 
                    class="form-control bg-transparent text-white"
                    value={priorite}
                    on:change={(event) => priorite = event.target.value}>
                    <option value="3" class="text-dark">Peu attendre</option>
                    <option value="2" class="text-dark">A traiter lorsque c'est possible</option>
                    <option value="1" class="text-dark">A traiter dès que possible</option>
                    <option value="0" class="text-dark">Urgent</option>
                </select>
            </div>
        </div>
        <div class="col-12 mb-4">
            <div class="form-group text-start">
                <label for="description" class="text-white fw-bold">Description de la tâche</label>
                <textarea 
                    name="description" 
                    id="description" 
                    class="form-control bg-transparent text-white"
                    rows="10"
                    on:change={(event) => description = event.target.value}>{description}</textarea>
            </div>
        </div>
        <div class="col-12 text-center mb-4">
            <button 
                type="submit"
                class="btn btn-outline-light"
                on:click={() => editTask(index, titre, description, dateEcheance, priorite)}>
                Modifier   
            </button> 
        </div>
    </div>
</div>

<style>
</style>