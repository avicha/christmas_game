import Scene from '../../prime/scene'
import Sprite from '../../prime/sprite'
import Rectangle from '../../prime/rectangle'
import Vector2 from '../../prime/vector2'
import Text from '../../prime/ui/text'
import ChristmasMan from '../sprites/christmas_man'
import House from '../sprites/house'
import resources from '../resources'

export default class MainScene extends Scene {

    constructor(game) {
        super(game)
        game.opts.stageColor = null
        this.game = game
        this.snow_count = 20
        this.speed = new Vector2(0, 0)
        this.total_houses = 30
        this.added_houses = 0
        this.score = 0
        this.is_begin = false
        this.is_gameover = false
        this.bgm = resources.bgm2
        this.count_down_sound = resources.count_down_sound
        this.jump_sound = resources.jump_sound
        this.scream_sound = resources.scream_sound
        this.bg = this.addGameObject(new Sprite(0, 0, 0, {
            texture: resources.bg
        }))
        this.moon = this.addGameObject(new Sprite(82, 15, 1, {
            texture: resources.moon,
            fixed: 'top-left'
        }))
        this.christmas_man = this.addGameObject(new ChristmasMan(100, -resources.house8.sizeHeight - resources.christmas_man_sprite.sizeHeight + 10, 5, {
            fixed: 'bottom-left'
        }))
        this.score_board = this.addGameObject(new Sprite(-270, 47, 1, {
            texture: resources.score_board,
            fixed: 'top-right'
        }))
        this.score_msg = this.addGameObject(new Text(-184, 90, 2, {
            text: this.score.toString(),
            fontFamily: 'Arial',
            fontSize: 40,
            lineHeight: 40,
            fontColor: '#fff',
            align: Text.ALIGN.CENTER,
            valign: Text.VALIGN.MIDDLE,
            fixed: 'top-right'
        }))
        this.play_btn = this.addGameObject(new Sprite(-342, 60, 10, {
            texture: resources.play,
            visible: !game.isMute,
            fixed: 'top-right'
        }))
        this.mute_btn = this.addGameObject(new Sprite(-342, 60, 10, {
            texture: resources.mute,
            visible: game.isMute,
            fixed: 'top-right'
        }))
        this.snows = [];
        for (let i = 0; i < this.snow_count; i++) {
            this.addSnow()
        }
        this.houses = []
        const house = this.addGameObject(new House(3, -resources.house8.sizeHeight, 3, {
            speed: this.speed,
            health: 0,
            type: 8,
            fixed: 'bottom-left'
        }))
        this.houses.push(house);
        for (let i = 1; i < 3; i++) {
            this.addHouse()
        }
        this.trees = []
        for (let i = 0; i < 2; i++) {
            this.addTree()
        }
        this.num_3 = this.addGameObject(new Sprite(-resources.num_3.sizeWidth / 2, 140, 10, {
            texture: resources.num_3,
            fixed: 'top-center'
        }))
        this.num_2 = this.addGameObject(new Sprite(-resources.num_2.sizeWidth / 2, 166, 10, {
            texture: resources.num_2,
            visible: false,
            fixed: 'top-center'
        }))
        this.num_1 = this.addGameObject(new Sprite(-resources.num_1.sizeWidth / 2, 152, 10, {
            texture: resources.num_1,
            visible: false,
            fixed: 'top-center'
        }))
        this.go = this.addGameObject(new Sprite(-resources.go.sizeWidth / 2, 218, 10, {
            texture: resources.go,
            visible: false,
            fixed: 'top-center'
        }))
        if (!this.game.isMute) {
            this.count_down_sound.play()
        }
        this.on('tap', e => {
            switch (e.target) {
                case this.play_btn:
                    this.bgm.pause();
                    this.count_down_sound.pause()
                    this.game.isMute = true
                    this.mute_btn.visible = true
                    this.play_btn.visible = false
                    break
                case this.mute_btn:
                    this.bgm.play()
                    this.game.isMute = false
                    this.mute_btn.visible = false
                    this.play_btn.visible = true
                    break
                default:
                    this.jump()
                    break
            }
        })
        setTimeout(() => {
            this.num_3.kill()
            this.num_2.visible = true
            setTimeout(() => {
                this.num_2.kill()
                this.num_1.visible = true
                setTimeout(() => {
                    this.num_1.kill()
                    this.go.visible = true
                    this.begin()
                }, 1000)
            }, 1000)
        }, 1000)
    }
    begin() {
        setTimeout(() => {
            this.count_down_sound.stop()
            this.go.kill()
            if (!this.game.isMute) {
                this.bgm.play(true)
            }
            this.christmas_man.setCurrentAnim('run')
            this.speed.set(-600, 0)
            this.is_begin = true
        }, 1000)
    }
    collide(house, dt) {
        const man_shape = this.christmas_man.shape.relativeTo(this.christmas_man.position)
        const house_shape = house.shape.relativeTo(house.position)
        return (man_shape.right > house_shape.left) && (man_shape.left < house_shape.right) && (man_shape.bottom <= house_shape.top) && (man_shape.bottom + (this.christmas_man.speed.y + this.christmas_man.acceleration.y * dt) * dt >= house_shape.top)
    }
    update(dt) {
        this.trees = this.trees.filter(tree => {
            if (tree.position.x + tree.texture.sizeWidth <= 0) {
                tree.kill()
                return false
            }
            return true
        })
        this.houses = this.houses.filter(house => {
            if (house.position.x + house.texture.sizeWidth <= 0) {
                house.kill()
                return false
            }
            return true
        });
        this.snows = this.snows.filter(snow => {
            if (snow.position.y > this.game.renderStageZone.bottom) {
                snow.kill()
                return false
            }
            return true
        });
        this.addTree()
        this.addHouse()
        for (let i = this.snows.length; i < this.snow_count; i++) {
            this.addSnow()
        }
        if (this.is_begin) {
            let is_fail = true
            for (const house of this.houses) {
                if (this.collide(house, dt) && this.christmas_man.currentAnimation != this.christmas_man.animations.down) {
                    is_fail = false
                    if (house.health) {
                        house.health -= 100
                        this.score++
                        this.score_msg.setText(this.score.toString())
                    }
                    if (this.christmas_man.currentAnimation != this.christmas_man.animations.run) {
                        this.christmas_man.setCurrentAnim('run')
                        this.christmas_man.speed.set(0, 0)
                        this.christmas_man.acceleration.set(0, 0)
                        const man_shape = this.christmas_man.shape
                        const house_shape = house.shape.relativeTo(house.position)
                        this.christmas_man._position.y = -(house_shape.height + man_shape.bottom)
                    }
                }
                if (house.health) {
                    break
                }
            }
            if (is_fail) {
                if (this.christmas_man.currentAnimation != this.christmas_man.animations.jump) {
                    this.christmas_man.setCurrentAnim('down')
                    const man_shape = this.christmas_man.shape.relativeTo(this.christmas_man.position)
                    const house_shape = this.houses[0].shape.relativeTo(this.houses[0].position)
                    this.christmas_man.acceleration.set(0, 2000)
                }
                if (this.christmas_man.position.y > this.game.renderStageZone.bottom && !this.is_gameover) {
                    this.is_gameover = true
                    this.christmas_man.kill()
                    if (!this.game.isMute) {
                        this.scream_sound.play()
                    }
                }
            }
            if (this.score == this.total_houses) {
                const last_house = this.houses[this.houses.length - 1]
                if (last_house.position.x + last_house.texture.sizeWidth / 3 <= this.game.renderStageZone.right) {
                    this.speed.set(0, 0)
                    this.christmas_man.speed.set(600, 0)
                    this.is_gameover = true
                }
            }
            if (this.is_gameover && !this.is_ended) {
                this.is_ended = true
                setTimeout(() => {
                    if (this.score <= 10) {
                        this.trigger('switchScene', 'PrimaryPrize', {
                            score: this.score
                        })
                    } else {
                        if (this.score < this.total_houses) {
                            this.trigger('switchScene', 'MediumPrize', {
                                score: this.score
                            })
                        } else {
                            this.trigger('switchScene', 'SuperPrize', {
                                score: this.score
                            })
                        }
                    }
                }, 1000)
            }
        }
        super.update(dt)
    }
    addSnow() {
        const pos_left = 200 + Math.random() * this.game.renderStageZone.width
        const pos_top = -50 + Math.random() * -50
        const scale = 0.5 + Math.random() * 0.5
        const speed = (this.game.renderStageZone.bottom - pos_top) / parseInt(10 + 4 * pos_top / 100)
        const snow = this.addGameObject(new Sprite(pos_left, pos_top, 5, {
            texture: resources.snow,
            speed: new Vector2(0, 0),
            scale: new Vector2(scale, scale),
            fixed: 'top-left'
        }))
        this.snows.push(snow)
        setTimeout(function() {
            snow.speed.set(-30, speed)
        }, 10000 * Math.random())
    }
    addTree() {
        const last_tree = this.trees[this.trees.length - 1]
        const last_tree_pos = last_tree ? (last_tree.position.x + last_tree.texture.sizeWidth) : 0
        if (last_tree_pos < 2 * this.game.renderStageZone.width) {
            const tree_texture = Math.random() < 0.5 ? resources.tree1 : resources.tree2
            const tree_pos = parseInt(last_tree_pos + (0.2 + Math.random() * 0.8) * 500)
            const tree = this.addGameObject(new Sprite(tree_pos, -tree_texture.sizeHeight, (Math.random() < 0.5 ? 2 : 4), {
                texture: tree_texture,
                speed: this.speed,
                fixed: 'bottom'
            }))
            this.trees.push(tree)
        }
    }
    addHouse() {
        if (this.added_houses < this.total_houses) {
            this.added_houses++
            const house_type = this.added_houses == this.total_houses ? 8 : parseInt(Math.random() * 100) % 4 + 1
            const house_texture = resources['house' + house_type]
            const last_house = this.houses[this.houses.length - 1]
            const last_house_pos = last_house ? (last_house.position.x + last_house.texture.sizeWidth) : 0
            const house_pos_left = parseInt(last_house_pos + (1 + Math.random() - this.score / this.total_houses) * 120)
            const house_pos_top = -house_texture.sizeHeight
            const house = this.addGameObject(new House(house_pos_left, house_pos_top, 3, {
                speed: this.speed,
                health: 100,
                type: house_type,
                fixed: 'bottom'
            }))
            this.houses.push(house)
            if (this.added_houses == this.total_houses) {
                this.flag = this.addGameObject(new Sprite(house_pos_left, house_pos_top - resources.flag.sizeHeight, 3, {
                    texture: resources.flag,
                    speed: this.speed
                }))
            }
        }
    }
    jump() {
        if (this.is_begin && this.christmas_man.currentAnimation == this.christmas_man.animations.run && !this.is_gameover) {
            this.christmas_man.speed.set(0, -1333)
            this.christmas_man.acceleration.set(0, 4444)
            this.christmas_man.setCurrentAnim('jump', 1)
            if (!this.game.isMute) {
                this.jump_sound.replay()
            }
        }
    }
    release() {
        this.bgm.stop()
        this.count_down_sound.stop()
        this.jump_sound.stop()
        this.scream_sound.stop()
        super.release()
    }
}