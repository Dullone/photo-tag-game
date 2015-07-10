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
    coordX: 200,
    coordY: 200,
    character: "Test"
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