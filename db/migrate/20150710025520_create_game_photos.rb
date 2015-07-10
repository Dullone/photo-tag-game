class CreateGamePhotos < ActiveRecord::Migration
  def change
    create_table :game_photos do |t|
      t.string :name, index: true, unique: true

      t.timestamps null: false
    end
  end
end
