export function getDateInUTC() {
    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    };
    return new Date().toLocaleString('UTC', options);
}

function mapNoteDateToUTC(date) {
    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    };
    return date.toLocaleString('UTC', options);
}

export function mapApiNote(note) {
    var epochMilliToDate = new Date(note.date);
    note.date = mapNoteDateToUTC(epochMilliToDate);
    return note;
}

export function mapNoteToApiNote(note) {
    var epochMilliToDate = new Date(note.date);
    note.date = mapNoteDateToUTC(epochMilliToDate);
    return note;
}