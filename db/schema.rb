# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150710160224) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "character_tags", force: :cascade do |t|
    t.integer  "game_photo_id"
    t.string   "character"
    t.integer  "coordX"
    t.integer  "coordY"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
  end

  add_index "character_tags", ["game_photo_id"], name: "index_character_tags_on_game_photo_id", using: :btree

  create_table "game_photos", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "game_photos", ["name"], name: "index_game_photos_on_name", using: :btree

  create_table "high_scores", force: :cascade do |t|
    t.integer  "game_photo_id"
    t.string   "name"
    t.integer  "score"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
  end

  add_index "high_scores", ["game_photo_id"], name: "index_high_scores_on_game_photo_id", using: :btree

  add_foreign_key "character_tags", "game_photos"
  add_foreign_key "high_scores", "game_photos"
end
