class CreateCharacterTags < ActiveRecord::Migration
  def change
    create_table :character_tags do |t|
      t.references :game_photo, index: true, foreign_key: true
      t.string :character
      t.integer :coordX
      t.integer :coordY

      t.timestamps null: false
    end
  end
end
