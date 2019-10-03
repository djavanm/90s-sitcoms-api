const sitcoms = [
  {
    name: 'The Fresh Prince of Bel-Air', seasons: 6, episodes: 148, premiereDate: '09-10-1990', finaleDate: '05-20-1996',
    castMembers: [ {name: 'Will Smith', character:'Will Smith', original: true}, {name: 'James Avery', character:'Uncle Phil', original: true},
      {name: 'Alfonso Ribiero', character:'Carlton Banks', original: true}, {name: 'Janet Hubert-Whitten', character:'Vivian Banks', original: true},
      {name: 'Daphne Maxwell Reed', character:'Vivian Banks', original: false}, {name: 'DJ Jazzy Jeff', character:'Jazz', original: true}]
  },
  {
    name: 'Friends', seasons: 10, episodes: 236, premiereDate: '09-22-1994', finaleDate: '05-06-2004',
    castMembers: [{name: 'Jennifer Aniston', character:'Rachel Green', original: true}, {name: 'Courteney Cox', character:'Monica Geller', original: true},
      {name: 'Matthew Perry', character:'Chandler Bing', original: true}, {name: 'Lisa Kudrow', character:'Phoebe Buffay', original: true},
      {name: 'Matt Leblanc', character:'Joey Tribbiani', original: true}, {name: 'David Schwimmer', character:'Ross Gellar', original: true}]
  },
  { name: 'Frasier', seasons: 11, episodes: 264, premiereDate: '09-16-1993', finaleDate: '05-13-2004',
    castMembers: [{ name: 'Kelsey Grammar', character: 'Frasier Cane', original: true }, { name: 'John Mahoney', character: 'Martin Cane', original: true }]
  },
  {
    name: 'The Simpsons', seasons: 31, episodes: 663, premiereDate: '12-17-1989', finaleDate: null,
    castMembers: [{ name: 'Dan Castellanata', character: 'Homer Simpson', original: true }, { name: 'Nancy Cartwright', character: 'Bart Simpson', original: true }]
  },
  {
    name: 'Seinfeld', seasons: 9, episodes: 180, premiereDate: '05-04-1998', finaleDate: '05-13-2004',
    castMembers: [{ name: 'Jerry Seinfeld', character: 'Jerry Seinfeld', original: true }, { name: 'Julia Luis-Dreyfus', character: 'Elaine Benes', original: true }]
  },
  {
    name: 'Full House', seasons: 8, episodes: 192, premiereDate: '09-22-1987', finaleDate: '05-23-1995',
    castMembers: [{ name: 'Bob Saget', character: 'Danny Tanner', original: true }, { name: 'Mary Kate Olsen', character: 'Michelle Tanner', original: true },
    { name: 'Ashley Olsen', character: 'Michelle Tanner', original: true }, { name: 'Andrea Barber', character: 'Kimmy Gibbler', original: true }]
  },
  {
    name: 'Family Matters', seasons: 9, episodes: 215,  premiereDate: '09-22-189', finaleDate: '05-09-1997',
    castMembers: [{ name: 'Jaleel White', character: 'Steve Urkel', original: true }, { name: 'Reginald VelJohnson', character: 'Carl Winslow', original: true }]
  },
  { name: 'Home Improvement', seasons: 8, episodes: 204, premiereDate: '09-16-1993', finaleDate: '05-13-2004' },
  { name: 'Boy Meets World', seasons: 7, episodes: 158, premiereDate: '09-24-1993', finaleDate: '0505-2000' },
  { name: 'Married With Children', seasons: 11, episodes: 259, premiereDate: '04-05-1987', finaleDate: '06-09-1997' },
  { name: 'Step By Step', seasons: 7, episodes: 160, premiereDate: '09-20-1991', finaleDate: '06-26-1998' },
  { name: 'Saved By The Bell', seasons: 4, episodes: 86, premiereDate: '08-20-1989', finaleDate: '05-22-1993' },
  { name: 'Sister, Sister', seasons: 6, episodes: 119, premiereDate: '04-01-1994', finaleDate: '05-23-1999' },
  { name: 'Mad About You', seasons: 7, episodes: 164, premiereDate: '09-23-1992', finaleDate: '05-4-1999' },
  { name: '3rd Rock From The Sun', seasons: 6, episodes: 139, premiereDate: '01-09-1996', finaleDate: '05-22-2001' },
  { name: 'Hangin With Mr. Cooper', seasons: 5, episodes: 101, premiereDate: '09-22-1992', finaleDate: '08-30-1997' },
  { name: 'Blossom', seasons: 5, episodes: 114, premiereDate: '07-05-1990', finaleDate: '05-22-1995' },
  { name: 'Moesha', seasons: 6, episodes: 127, premiereDate: '01-23-1996', finaleDate: '0514-2001' },
  { name: 'The Drew Carey Show', seasons: 9, episodes: 233, premiereDate: '08-20-1989', finaleDate: '05-22-1993' },
  { name: 'Living Single', seasons: 5, episodes: 118, premiereDate: '08-22-1993', finaleDate: '01-01-1998' },
  { name: 'Martin', seasons: 5, episodes: 132, premiereDate: '08-27-1992', finaleDate: '05-01-1997' },
  { name: 'Smart Guy', seasons: 3, episodes: 51, premiereDate: '04-02-1997', finaleDate: '05-16-1999' },
  { name: 'The Wonder Years', seasons: 6, episodes: 115, premiereDate: '01-31-1988', finaleDate: '05-12-1993' },
  { name: 'The Nanny', seasons: 6, episodes: 146, premiereDate: '11-03-1993', finaleDate: '06-23-1999' },
  { name: 'Everybody Loves Raymond', seasons: 9, episodes: 210, premiereDate: '09-13-1996', finaleDate: '05-16-2005' },
  { name: 'Sabrina The Teenage Witch', seasons: 7, episodes: 166, premiereDate: '09-27-1996', finaleDate: '04-24-2003' },
  { name: 'All That', seasons: 11, episodes: 179, premiereDate: '04-14-1994', finaleDate: '11-18-2000' },
  { name: 'Kenan And Kel', seasons: 4, episodes: 62, premiereDate: '08-17-1996', finaleDate: '05-03-2000' },
  { name: 'Clarissa Explains It All', seasons: 5, episodes: 65, premiereDate: '03-23-1991', finaleDate: '10-01-1994' },
  { name: 'The Adventures of Pete And Pete', seasons: 3, episodes: 34, premiereDate: '02-09-1991', finaleDate: '04-01-1996' },
  { name: 'My Brother And Me', seasons: 1, episodes: 13, premiereDate: '10-15-1994', finaleDate: '01-15-1995' },
];

module.exports = sitcoms;
