import { clone } from "./clone";

export function updateQueue() {
  let _minors = [];
  let _majors = [];

  function addMinor(update) {
    _minors.push(update);
    console.log("addMinor", _minors);
  }

  function addMajor(update) {
    // ace is high, a new controller who has had no replies to join msg
    // resets the major count
    if (update.majorCount === 0) {
      _majors = [];
      _minors = [];
    }
    _majors.push(update);
    _majors.sort((a, b) => {
      if (a.majorCount > b.majorCount) return 1;
      if (a.majorCount < b.majorCount) return -1;
      if (a.majorPeerId > b.majorPeerId) return 1;
      if (a.majorPeerId < b.majorPeerId) return -1;
      return 1;
    });
    _majors = _majors.slice(-1);
    _minors = [];

    console.log("addMajor", _majors);
  }

  function getLatest(allowAll = true, allowList) {
    const updates = [..._minors].sort((a, b) => {
      if (a.majorCount > b.majorCount) return 1;
      if (a.majorCount < b.majorCount) return -1;
      if (a.majorPeerId > b.majorPeerId) return 1;
      if (a.majorPeerId < b.majorPeerId) return -1;
      if (a.minorCount > b.minorCount) return 1;
      if (a.minorCount < b.minorCount) return -1;
      if (a.minorPeerId > b.minorPeerId) return 1;
      if (a.minorPeerId < b.minorPeerId) return -1;
      return 0;
    });
    console.log("updates", updates, _minors, _majors);

    if (_majors.length === 0) return null;
    if (_minors.length === 0) return clone(_majors[_majors.length - 1]);

    const { majorCount, majorPeerId } = updates[updates.length - 1];
    _minors = updates.filter(
      x =>
        x.majorCount >= majorCount &&
        x.majorPeerId === majorPeerId &&
        (allowAll ||
          (allowList.includes(x.minorPeerId) &&
            allowList.includes(x.majorPeerId)))
    );

    console.log("filter", majorCount, majorPeerId, allowAll, _majors);

    _majors = _majors.filter(
      x =>
        // x.majorCount === majorCount &&
        // x.majorPeerId === majorPeerId &&
        allowAll || allowList.includes(x.majorPeerId)
    );

    const major = _majors[_majors.length - 1];
    console.log(
      "crush",
      _majors,
      major.body,
      ...updates.map(x => x.body),
      Object.assign(clone(major.body), ...updates.map(x => x.body))
    );

    return major
      ? {
          majorCount,
          majorPeerId,
          minorCount: major.minorCount,
          minorPeerId: major.minorPeerId,
          body: Object.assign(clone(major.body), ...updates.map(x => x.body))
        }
      : null;
  }

  return {
    addMajor,
    addMinor,
    getLatest
  };
}
