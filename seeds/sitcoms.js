const sitcoms = require('../sitcoms');

const createSitcom = (knex, sitcom) => {
  return knex('sitcoms').insert({
    title: sitcom.name,
    seasons: sitcom.seasons,
    episodes: sitcom.episodes,
    premiere_date: sitcom.premiereDate,
    finale_date: sitcom.finaleDate
  }, 'id')
  .then(sitcomId => {
    let castPromises = sitcom.castMembers.reduce((promises, castMember) => {

      promises.push(createCastMember(knex, { ...castMember, sitcom_id: sitcomId[0] }));
      return promises;
    }, []);
    return Promise.all(castPromises);
  })
};

const createCastMember = (knex, castMember) => {
  return knex('cast_members').insert(castMember);
};


exports.seed = (knex) => {
  return knex('sitcoms').del()
    .then(() => knex('cast_members').del())
    .then(() => {
      let sitcomPromises = sitcoms.reduce((promises, sitcom) => {
        promises.push(createSitcom(knex, sitcom));
        return promises;
      }, [])
      return Promise.all(sitcomPromises);
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};
