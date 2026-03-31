# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.1].define(version: 2026_03_31_222950) do
  create_table "categories", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.string "description"
    t.string "name"
    t.datetime "updated_at", null: false
  end

  create_table "category_items", force: :cascade do |t|
    t.integer "category_id", null: false
    t.datetime "created_at", null: false
    t.integer "item_id", null: false
    t.datetime "updated_at", null: false
    t.index ["category_id"], name: "index_category_items_on_category_id"
    t.index ["item_id"], name: "index_category_items_on_item_id"
  end

  create_table "category_slots", force: :cascade do |t|
    t.integer "category_id", null: false
    t.datetime "created_at", null: false
    t.integer "slot_id", null: false
    t.datetime "updated_at", null: false
    t.index ["category_id"], name: "index_category_slots_on_category_id"
    t.index ["slot_id"], name: "index_category_slots_on_slot_id"
  end

  create_table "characters", force: :cascade do |t|
    t.integer "bab"
    t.integer "charisma"
    t.integer "constitution"
    t.datetime "created_at", null: false
    t.integer "dexterity"
    t.integer "health"
    t.integer "intelligence"
    t.integer "level"
    t.string "name"
    t.integer "strength"
    t.datetime "updated_at", null: false
    t.integer "wisdom"
  end

  create_table "items", force: :cascade do |t|
    t.json "ability"
    t.integer "category_id"
    t.datetime "created_at", null: false
    t.string "description"
    t.string "name"
    t.datetime "updated_at", null: false
  end

  create_table "loadouts", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.string "description"
    t.string "name"
    t.datetime "updated_at", null: false
  end

  create_table "slots", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.string "name"
    t.datetime "updated_at", null: false
  end

  add_foreign_key "category_items", "categories"
  add_foreign_key "category_items", "items"
  add_foreign_key "category_slots", "categories"
  add_foreign_key "category_slots", "slots"
end
