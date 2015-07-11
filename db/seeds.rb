# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

photo1 = GamePhoto.create(
    name: "photo.jpg",
  )

photo1.characterTags.create(
    coordX: 77,
    coordY: 46,
    character: "Largest_falling_Pedal"
  )
photo1.characterTags.create(
    coordX: 341,
    coordY: 451,
    character: "Scroll_Bow"
  )
photo1.characterTags.create(
    coordX: 159,
    coordY: 511,
    character: "Clasp"
  )

photo1.characterTags.create(
    coordX: 310,
    coordY: 304,
    character: "Tie_clamp"
  )

photo1.characterTags.create(
    coordX: 640,
    coordY: 573,
    character: "Flower_stigma"
  )

photo1.highScores.create(
    name: "Tester",
    score: 300
  )

photo1.highScores.create(
    name: "Tester2",
    score: 420
  )

photo1.highScores.create(
    name: "Tester",
    score: 280
  )

photo1.highScores.create(
    name: "Failer",
    score: 3980
  )