type EventItem = {
  id: string;
  eventType: string;
};

const dispatchList: EventItem[] = [];

function addToDispatchList(item: EventItem) {
  dispatchList.push(item);
}

const resetDispatchList = () => {
  dispatchList.splice(0, dispatchList.length);
};

export { dispatchList, addToDispatchList, resetDispatchList };
